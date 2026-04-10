const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  customId: "order_modal",

  async execute(interaction) {
    const CATEGORY_ID = "1490556470813523978";
    const STAFF_ROLE_IDS = ["1490556337568878766", "1490556336893595808"];

    const budget = interaction.fields.getTextInputValue("budget");
    const description = interaction.fields.getTextInputValue("description");
    const quantity = interaction.fields.getTextInputValue("quantity");

    const username = interaction.user.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const existing = interaction.guild.channels.cache.find(
      c => c.topic === interaction.user.id
    );

    if (existing) {
      return interaction.reply({
        content: `You already have an open order: ${existing}`,
        flags: 64
      });
    }

    const staffRoles = STAFF_ROLE_IDS
      .map(roleId => interaction.guild.roles.cache.get(roleId))
      .filter(role => role);

    console.log("Resolved roles:", staffRoles.map(r => `${r.name} (${r.id})`));

    const overwrites = [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks
        ]
      },
      ...staffRoles.map(role => ({
        id: role.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks,
          PermissionFlagsBits.ManageChannels
        ]
      }))
    ];

    const channel = await interaction.guild.channels.create({
      name: `order-${username}`,
      type: ChannelType.GuildText,
      parent: CATEGORY_ID,
      topic: interaction.user.id,
      permissionOverwrites: overwrites
    });

    await interaction.reply({
  ephemeral: true,
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:Check:1473759297560379504> Your order has been created successfully: ${channel}`
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

    await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:Bell:1473759200684277902> New Order\n-# @everyone | ${interaction.user}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A new order has been opened. Ensure to claim the order if you are interested in working on this order. View order details below.\n\n**Budget:** ${budget}\n**Quantity:** ${quantity}\n**Description:** ${description}`
        },
        {
          "type": 1,
          "components": [
            {
              "style": 3,
              "type": 2,
              "label": "Claim",
              "flow": {
                "actions": []
              },
              "custom_id": "p_289676018401153028"
            },
            {
              "style": 4,
              "type": 2,
              "label": "Close",
              "flow": {
                "actions": []
              },
              "custom_id": "p_289669033127579659"
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
});
  }
};