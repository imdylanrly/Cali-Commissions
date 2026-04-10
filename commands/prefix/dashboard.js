module.exports = {
    name: "dashboard",

    async execute(message, args ) {
        const channel = message.guild.channels.cache.get("1490556477327282186")
        const REQUIRED_ROLE_ID = "1490556334142390322";

        if (
            !message.member.roles.cache.has(REQUIRED_ROLE_ID) &&
            !message.member.permissions.has("Administrator")
        ){
            return message.reply({
                content: "You do not have permission to use this command."
            });
        }

        channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1490556464119681088/1492068539891187843/2.png?ex=69d9fc9d&is=69d8ab1d&hm=1db3f51720ee38d0674f35ab22330878fdf964c065198575a964048b8255e22a&=&format=webp&quality=lossless"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "Welcome to **Cali's Commissions** — your go-to designer. Cali specializes in multiple fields, from graphic design to server layouts and more. Order today for an incredible order experience. Where Creativity Meets Reliability —  Cali's Commissions"
        },
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "type": 2,
              "label": "Help",
              "flow": {
                "actions": []
              },
              "custom_id": "p_289666122272215042"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Guidelines",
              "flow": {
                "actions": []
              },
              "custom_id": "p_289666125396971523"
            }
          ]
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