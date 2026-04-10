module.exports = {
    name: "group",

    async execute(message, args) {
        await message.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "You can join the group [here]()"
        }
      ]
    }
  ]
})
    }
}