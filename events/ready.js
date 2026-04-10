module.exports = {
  name: "clientReady",
  once: true,

  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const updateStatus = () => {
      const totalMembers = client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0);

      client.user.setActivity(`Watching ${totalMembers} members`, {
        type: 3
      });
    };

    updateStatus();
    setInterval(updateStatus, 60000);
  }
};