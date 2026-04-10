const { PermissionFlagsBits } = require("discord.js");

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

    const components = message.components.map(row => ({
      ...row.toJSON(),
      components: row.components.map(btn => {
        const data = btn.toJSON();

        if (data.custom_id === "p_289676018401153028") {
          return {
            ...data,
            label: "Unclaim",
            custom_id: "unclaim_order",
            style: 4
          };
        }

        if (data.custom_id === "unclaim_order") {
          return {
            ...data,
            label: "Claim",
            custom_id: "p_289676018401153028",
            style: 3
          };
        }

        return data;
      })
    }));

    await interaction.update({ components });

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