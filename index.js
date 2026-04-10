require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.prefix = "-";

// collections
client.prefixCommands = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();

// handlers
require("./handlers/commandHandler")(client);
require("./handlers/buttonHandler")(client);
require("./handlers/menuHandler")(client);
require("./handlers/modalHandler")(client);

// events loader
const eventsPath = path.join(process.cwd(), "events");
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.DISCORD_TOKEN);