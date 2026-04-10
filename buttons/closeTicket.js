module.exports = {
  customId: "p_289669033127579659",

  async execute(interaction) {
    const STAFF_ROLE_IDS = ["1490556337568878766", "1490556336893595808"];

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has(STAFF_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "You do not have permission to use this button.",
        flags: 64
      });
    }

    if (!interaction.channel.topic || !/^\d+$/.test(interaction.channel.topic)) {
      return interaction.reply({
        content: "You can only close a ticket.",
        flags: 64
      });
    }

    try {
      const user = await interaction.client.users.fetch(interaction.channel.topic).catch(() => null);

      if (user) {
        await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:Bell:1473759200684277902> Ticket Closed"
        },
        {
          "type": 10,
          "content": "Your ticket in **Cali's Commissions** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
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
}).catch(() => {});
      }

      await interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "<a:A_loading:1473759079485673635> Closing ticket..."
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
});

      setTimeout(async () => {
        await interaction.channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "An error occured.",
          flags: 64
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "An error occured.",
          flags: 64
        }).catch(() => {});
      }
    }
  }
};