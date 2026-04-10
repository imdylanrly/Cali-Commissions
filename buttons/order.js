const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  customId: "order",

  async execute(interaction) {

    const modal = new ModalBuilder()
      .setCustomId("order_modal")
      .setTitle("Order");

    const budgetInput = new TextInputBuilder()
      .setCustomId("budget")
      .setLabel("Budget")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder("500 rbx");

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Description")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setPlaceholder("Banners");

    const quantityInput = new TextInputBuilder()
      .setCustomId("quantity")
      .setLabel("Quantity")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder("3")

    const row1 = new ActionRowBuilder().addComponents(budgetInput);
    const row2 = new ActionRowBuilder().addComponents(descriptionInput);
    const row3 = new ActionRowBuilder().addComponents(quantityInput)

    modal.addComponents(row1, row2, row3);

    await interaction.showModal(modal);
  }
};