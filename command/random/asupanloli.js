const fs = require('fs')

module.exports = {
  name: "asupanloli",
  alias: ["asupanloli"],
  category: "random",
  wait: true,
  async run({msg, conn},{cmdNya}){
    try {
      const asu = JSON.parse(fs.readFileSync('./lib/storage/asupanloli.json'))
      randIndex = Math.floor(Math.random() * asu.length);
			supan = asu[randIndex];
      await conn.sendMessage(msg.from, {video: {url : supan.url},caption: "_Listo✓_"},{quoted: msg, adReply: true})
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
