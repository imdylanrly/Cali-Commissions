const { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  customId: "p_289676018401153028",

  async execute(interaction) {

    const STAFF_ROLE_IDS = ["1490556337568878766", "1490556336893595808"];

    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
    const hasRole = interaction.member.roles.cache.some(role =>
      STAFF_ROLE_IDS.includes(role.id)
    );

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "You do not have permission to use this button.",
        ephemeral: true
      });
    }

    const message = interaction.message;

    const newRows = message.components.map(row => {
      const newRow = new ActionRowBuilder();

      row.components.forEach(btn => {
        const data = btn.toJSON();

        if (data.custom_id === "p_289676018401153028") {
          newRow.addComponents(
            new ButtonBuilder()
              .setCustomId("unclaim_order")
              .setLabel("Unclaim")
              .setStyle(4)
          );
        }

        else if (data.custom_id === "unclaim_order") {
          newRow.addComponents(
            new ButtonBuilder()
              .setCustomId("p_289676018401153028")
              .setLabel("Claim")
              .setStyle(3)
          );
        }

        else {
          newRow.addComponents(
            new ButtonBuilder()
              .setCustomId(data.custom_id)
              .setLabel(data.label)
              .setStyle(data.style)
          );
        }
      });

      return newRow;
    });

    await interaction.update({
      components: newRows
    });

    if (interaction.customId === "p_289676018401153028") {
      await interaction.followUp({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `Order has been claimed by ${interaction.user}.`
        }
      ]
    }
  ]
});
    } else {
      await interaction.followUp({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `Order unclaimed by ${interaction.user}.`
        }
      ]
    }
  ]
});
    }
  }
};