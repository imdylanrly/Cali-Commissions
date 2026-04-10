module.exports = {
  name: "guildMemberRemove",

  async execute(member, client) {

    const totalMembers = member.guild.memberCount;

    client.user.setActivity(`Watching ${totalMembers} members`, {
      type: 3
    });
  }
};