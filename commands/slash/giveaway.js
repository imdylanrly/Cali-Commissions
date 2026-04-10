const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Start a giveaway.")
    .addStringOption(option =>
      option.setName("prize").setDescription("Input the prize to giveaway.").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("duration").setDescription("Input the duration (1d, 1h, 1m).").setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("winners").setDescription("Amount of winners.").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("ping")
        .setDescription("Choose who to ping.")
        .addChoices(
          { name: "@everyone", value: "everyone" },
          { name: "@here", value: "here" },
          { name: "No Ping", value: "none" }
        )
    )
    .addRoleOption(option =>
      option.setName("role").setDescription("Ping a role.")
    ),

  async execute(interaction) {

    const REQUIRED_ROLE_ID = "1490556334142390322";

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true
      });
    }

    const prize = interaction.options.getString("prize");
    const durationInput = interaction.options.getString("duration");
    const winnerCount = interaction.options.getInteger("winners");
    const pingChoice = interaction.options.getString("ping");
    const rolePing = interaction.options.getRole("role");

    const db = interaction.client.db;

    const timeRegex = /^(\d+)([smhd])$/;
    const match = durationInput.match(timeRegex);

    if (!match) {
      return interaction.reply({
        content: "Invalid duration format. Use 10m, 1h, 1d.",
        ephemeral: true
      });
    }

    const amount = parseInt(match[1]);
    const unit = match[2];

    const multipliers = {
      s: 1000,
      m: 60000,
      h: 3600000,
      d: 86400000
    };

    const durationMs = amount * multipliers[unit];
    const endTime = Date.now() + durationMs;
    const endTimestamp = `<t:${Math.floor(endTime / 1000)}:R>`;

    let pingContent = null;
    let allowedMentions = { parse: [] };

    if (pingChoice === "everyone") {
      pingContent = "@everyone";
      allowedMentions.parse = ["everyone"];
    }

    if (pingChoice === "here") {
      pingContent = "@here";
      allowedMentions.parse = ["everyone"];
    }

    if (rolePing) {
      pingContent = `<@&${rolePing.id}>`;
      allowedMentions.roles = [rolePing.id];
    }

    const message = await interaction.channel.send({
      content: pingContent ?? "",
      allowedMentions,
      embeds: [
        {
          title: `<:Confetti:1473759358562205716> ${prize}`,
          color: 2303016,
          description: `A new giveaway is being hosted by ${interaction.user}\n\n**Winner(s):** ${winnerCount}\n**Duration:** ${endTimestamp}`,
          image: {
            url: "https://media.discordapp.net/attachments/1490556464119681088/1492066109652865156/8.png"
          }
        }
      ],
      components: [
        {
          type: 1,
          components: [
            {
              style: 2,
              type: 2,
              label: "0",
              custom_id: "giveaway_enter"
            }
          ]
        }
      ]
    });

    db.prepare(`
      INSERT INTO giveaways (messageId, channelId, prize, winnerCount, endTime, entries)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      message.id,
      interaction.channel.id,
      prize,
      winnerCount,
      endTime,
      JSON.stringify([])
    );

    await interaction.reply({
      content: "Giveaway started.",
      ephemeral: true
    });

    setTimeout(async () => {

      const giveaway = db.prepare(`
        SELECT * FROM giveaways WHERE messageId = ?
      `).get(message.id);

      if (!giveaway) return;

      const entries = JSON.parse(giveaway.entries);
      let winners = [];

      const channel = interaction.guild.channels.cache.get(giveaway.channelId);
      if (!channel) return;

      const giveawayMessage = await channel.messages.fetch(giveaway.messageId).catch(() => null);
      if (!giveawayMessage) return;

      if (entries.length === 0) {
        await giveawayMessage.reply({ content: "No valid entries. Giveaway cancelled." });
      } else {
        for (let i = 0; i < Math.min(giveaway.winnerCount, entries.length); i++) {
          const randomIndex = Math.floor(Math.random() * entries.length);
          winners.push(entries[randomIndex]);
          entries.splice(randomIndex, 1);
        }

        await giveawayMessage.reply({
          content: `<:Confetti:1473759358562205716> **Congratulations** ${winners.map(id => `<@${id}>`).join(", ")} on winning **${giveaway.prize}**!`
        });
      }

      db.prepare(`DELETE FROM giveaways WHERE messageId = ?`).run(giveaway.messageId);

      const disabledEnter = new ButtonBuilder()
        .setCustomId("giveaway_enter")
        .setLabel(`${winners.length}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);

      const disabledRow = new ActionRowBuilder().addComponents(disabledEnter);

      await giveawayMessage.edit({ components: [disabledRow] });

    }, durationMs);
  }
};