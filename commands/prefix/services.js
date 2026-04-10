module.exports = {
    name: "services",

    async execute(message, args) {
        const channel = message.guild.channels.cache.get("1490556482649849857")
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
                "url": "https://media.discordapp.net/attachments/1490556464119681088/1492076251148455956/5.png?ex=69da03cb&is=69d8b24b&hm=a35f53950f2038c5c99b1c6467c990e351da367af4726184f1a297055aa22fc5&=&format=webp&quality=lossless"
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
          "content": "If you're looking to order with **Cali** or **Devine**, ensure to review our  Order Guidelines below. Additionally, when ordering, fill out all questions asked with detail and accuracy to ensure your order can be completed efficiently."
        },
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "type": 2,
              "label": "Order",
              "flow": {
                "actions": []
              },
              "custom_id": "order"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Order Guidelines",
              "flow": {
                "actions": []
              },
              "custom_id": "order_guidelines"
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