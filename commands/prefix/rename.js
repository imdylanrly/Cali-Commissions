module.exports = {
  name: "rename",

  async execute(message, args) {
    if (message.author.bot) return;

    const STAFF_ROLE_IDS = ["1489134358123122749", "1489134347318460496"];

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(STAFF_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic) {
      return message.reply({
        content: "This channel is not a ticket channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!/^\d+$/.test(message.channel.topic)) {
      return message.reply({
        content: "You can only rename ticket channels.",
        allowedMentions: { repliedUser: false }
      });
    }

    const newName = args[0]?.toLowerCase().replace(/[^a-z0-9-]/g, "");

    if (!newName) {
      return message.reply({
        content: "Failed to detect a valid new ticket name.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      await message.channel.setName(newName);

      await message.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:Check:1473759297560379504> Successfully renamed ticket to \`${newName}\`.`
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
                "url": "https://media.discordapp.net/attachments/1490556464119681088/1492066109652865156/8.png?ex=69daa319&is=69d95199&hm=367bdb3adcdc094709951df7c29b5f18813a16e3b25b8e2a16951a43754f13f6&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});
    } catch (err) {
      console.error(err);

      return message.reply({
        content: "An eror occured.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};