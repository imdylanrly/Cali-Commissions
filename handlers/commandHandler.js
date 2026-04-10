const fs = require("fs");
const path = require("path");

module.exports = (client) => {

  const prefixPath = path.join(process.cwd(), "commands", "prefix");
  if (fs.existsSync(prefixPath)) {
    const files = fs.readdirSync(prefixPath).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const cmd = require(path.join(prefixPath, file));
      if (cmd.name) client.prefixCommands.set(cmd.name, cmd);
    }
  }

  const slashPath = path.join(process.cwd(), "commands", "slash");
  if (fs.existsSync(slashPath)) {
    const files = fs.readdirSync(slashPath).filter(f => f.endsWith(".js"));
    for (const file of files) {
      const cmd = require(path.join(slashPath, file));
      if (cmd.data) client.slashCommands.set(cmd.data.name, cmd);
    }
  }
};