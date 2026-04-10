const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  customId: "giveaway_enter",

  async execute(interaction) {

    const db = interaction.client.db;

    await interaction.deferReply({ ephemeral: true });

    const giveaway = db.prepare(`
      SELECT * FROM giveaways WHERE messageId = ?
    `).get(interaction.message.id);

    if (!giveaway) {
      return interaction.editReply({
        content: "This giveaway has ended."
      });
    }

    let entries = JSON.parse(giveaway.entries);
    const alreadyEntered = entries.includes(interaction.user.id);

    if (alreadyEntered) {
      entries = entries.filter(id => id !== interaction.user.id);

      await interaction.editReply({
        content: "You have left the giveaway."
      });

    } else {
      entries.push(interaction.user.id);

      await interaction.editReply({
        content: "You have entered the giveaway."
      });
    }

    db.prepare(`
      UPDATE giveaways SET entries = ? WHERE messageId = ?
    `).run(JSON.stringify(entries), interaction.message.id);

    const enterButton = new ButtonBuilder()
      .setCustomId("giveaway_enter")
      .setLabel(`${entries.length}`)
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(enterButton);

    await interaction.message.edit({ components: [row] });
  }
};