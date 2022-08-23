const { monospace, isUrl } = require("../../lib/function")

module.exports = {
  name: "goredl",
  alias: ["goredl"],
  category: "downloader",
  desc: "Descargar gore",
  async run({msg, conn},{q}){
    if(!q) throw `_× Ejemplo : .${msg.command} <link>_`
    if(!isUrl(q) && q.includes("seegore.com")) throw 'Link inválido!!'
    await msg.reply(respon.wait)
    try {
      gor = await sc.goredl(q)
      gore = gor.data
      txt = "*乂 Gore - Downloader*\n\n"
      txt += monospace(` × Título : ${gore.judul}`) + "\n"
      txt += monospace(` × Views : ${gore.views}`) + "\n"
      txt += monospace(` × Comentario : ${gore.comment}`) + "\n"
      txt += monospace(` × Link : ${gore.link}`) + "\n\n"
      txt += "*_乂 Simple WhatsApp - Bot By Carlos*"
      conn.sendFile(msg.from, gore.link, "", txt,msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}