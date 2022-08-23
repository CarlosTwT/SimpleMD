const fs = require("fs")

module.exports = {
  name: ["afk"].map((v) => v + " <Razón>"),
  alias: ["afk"],
  category: "main",
  desc: "Lejos del teclado",
  isGroup: true,
  async run({conn, msg}, {q}) {
    try {
      const afk = JSON.parse(fs.readFileSync("./lib/database/afk.json"));
      afk[msg.sender] = {
        id: msg.sender,
        time: Date.now(),
        reason: q ? q : "Crls",
      }
      await fs.writeFileSync("./lib/database/afk.json", JSON.stringify(afk));
      txt = "*AFK MODO*\n\n"
      txt += msg.pushName + " ahora es Afk!!\n"
      txt += `Razon : ${q ? q : "Crls"}`
      msg.reply(txt)
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}
