const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  customId: "p_289669033127579659",

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

        // 🔄 CLAIM → UNCLAIM
        if (data.custom_id === "p_289669033127579659") {
          return {
            ...data,
            label: "Unclaim",
            custom_id: "unclaim_order",
            style: 4 // red
          };
        }

        // 🔄 UNCLAIM → CLAIM
        if (data.custom_id === "unclaim_order") {
          return {
            ...data,
            label: "Claim",
            custom_id: "p_289669033127579659",
            style: 3 // green
          };
        }

        return data;
      })
    }));

    // 🔁 EDIT ORIGINAL MESSAGE
    await interaction.update({
      components
    });

    // 🔔 SEND FEEDBACK
    if (interaction.customId === "p_289669033127579659") {
      await interaction.followUp({
        content: `Order has been claimed by ${interaction.user}.`,
        ephemeral: true
      });
    } else {
      await interaction.followUp({
        content: `Order has been unclaimed by ${interaction.user}.`,
        ephemeral: true
      });
    }
  }
};