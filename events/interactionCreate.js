module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    if (interaction.isChatInputCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (cmd) await cmd.execute(interaction, client);
    }

    else if (interaction.isButton()) {
      const btn = client.buttons.get(interaction.customId);
      if (btn) await btn.execute(interaction, client);
    }

    else if (interaction.isStringSelectMenu()) {
      const menu = client.menus.get(interaction.customId);
      if (menu) await menu.execute(interaction, client);
    }

    else if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (modal) await modal.execute(interaction, client);
    }
  }
};