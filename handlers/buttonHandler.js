const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const dir = path.join(process.cwd(), "buttons");

  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const btn = require(path.join(dir, file));
    if (btn.customId) {
      client.buttons.set(btn.customId, btn);
    }
  }
};