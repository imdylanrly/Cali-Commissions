require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const slashPath = path.join(process.cwd(), "commands", "slash");

const files = fs.readdirSync(slashPath).filter(f => f.endsWith(".js"));

for (const file of files) {
  const cmd = require(path.join(slashPath, file));
  if (cmd.data) commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Deploying commands...");

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log("Commands deployed!");
  } catch (err) {
    console.error(err);
  }
})();