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

// clone original message structure
const components = JSON.parse(JSON.stringify(message.components));

for (const row of components) {
  for (const comp of row.components || []) {

    // ONLY touch buttons
    if (comp.type === 2) {

      if (comp.custom_id === "p_289676018401153028") {
        comp.label = "Unclaim";
        comp.custom_id = "unclaim_order";
        comp.style = 4;
      }

      else if (comp.custom_id === "unclaim_order") {
        comp.label = "Claim";
        comp.custom_id = "p_289676018401153028";
        comp.style = 3;
      }

    }
  }
}

await interaction.update({
  components
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