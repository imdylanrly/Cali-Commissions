const { SlashComandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("review")
        .setDescription("Leave a review for your recent order.")
        .addUserOption(option =>
            option
            .setName("designer")
            .setDescription("Select the designer of your order.")
            .setRequired(true)

        )
        .addStringOption(option =>
            option
            .setName("rating")
            .setDescription("Select the rating of your order experience.")
            .addChoices(
                { name: "⭐", value: "⭐"},
                { name: "⭐⭐", value: "⭐⭐"},
                { name: "⭐⭐⭐", value: "⭐⭐⭐"},
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐"},
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐"}
            )
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName("feedback")
            .setDescription("Input feedback for the designer.")
            .setRequired(true)
        ),

    async execute(interaction, client) {

        const TARGET_CHANNEL_ID = "1491456632876564694";
        const channel = interaction.guild.chnanels.cache.get(TARGET_CHANNEL_ID)

        const user = interaction.options.getUser("user");
        const rating = interaction.options.getString("rating");
        const feedback = interaction.options.getString("feedback");

        channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:palette:1490569067302752319> Review"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `${interaction.user} is the client of this order.\n\n**Designer:** ${user}\n**Rating:** ${rating}\n**Feedback:** ${feedback}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1490556464119681088/1492066109652865156/8.png?ex=69d9fa59&is=69d8a8d9&hm=78358ac58cca70a4f3d4c8ccda89a474551d66ca621eefb9402edfde70c0047c&=&format=webp&quality=lossless&width=550&height=28"
              }
            }
          ]
        }
      ]
    }
  ]
})

    await interaction.reply("<:Check:1473759297560379504> Succesfully sent review.")

    }

}