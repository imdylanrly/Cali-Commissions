module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {

    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

    if (channel) {
      channel.send(`Welcome ${member} <:cali_logo:1490569153751289917> Cali's Commissions - Please make sure to check out our [services](<https://discord.com/channels/1473447479050506394/1490556482649849857>) page to order.`);
    }

    const totalMembers = member.guild.memberCount;

    client.user.setActivity(`Watching ${totalMembers} members`, {
      type: 3
    });
  }
};