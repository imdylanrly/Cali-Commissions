const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const dir = path.join(process.cwd(), "menus");

  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const menu = require(path.join(dir, file));
    if (menu.customId) {
      client.menus.set(menu.customId, menu);
    }
  }
};