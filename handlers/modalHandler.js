const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const dir = path.join(process.cwd(), "modals");

  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const modal = require(path.join(dir, file));
    if (modal.customId) {
      client.modals.set(modal.customId, modal);
    }
  }
};