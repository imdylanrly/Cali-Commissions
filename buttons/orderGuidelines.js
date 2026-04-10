module.exports = {
    customId: "order_guidelines",
    
    async execute(interaction) {
        return interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "` #1 ` **Refunds**\n- Refunds will not be offered unless an error occurs on our side.\n\n` #2 ` **Respect**\n- You are required to show respect to your designer and moderators when ordering.\n- Disrespect will not be tolerated.\n\n` #3 ` **Payment Before Product**\n- You are required to pay **100%** before your designer starts working on your order.\n- No exceptions will be made."
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
                "url": "https://media.discordapp.net/attachments/1490556464119681088/1492066109652865156/8.png?ex=69d9fa59&is=69d8a8d9&hm=78358ac58cca70a4f3d4c8ccda89a474551d66ca621eefb9402edfde70c0047c&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
})
    }
}