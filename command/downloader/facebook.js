const { monospace, isUrl } = require("../../lib/function")

module.exports = {
  name: "fb",
  alias: ["fbdl","facebook","fb"],
  category: "downloader",
  desc: "Descargar de Facebook",
  async run({msg, conn},{q}){
    if(!q) throw ` _× Ejemplo : ${msg.command} <url>_`
    if(!isUrl(q) && q.includes("facebook.com")) throw 'Link inválido!!'
    await msg.reply(respon.wait)
    try {
      fbdl = await sc.facebook2(q)
      txt = "*乂 Facebook - Downloader*\n\n"
      txt += ` _× Título : ${fbdl.title}_\n`
      txt += ` _× Url : ${fbdl.hd != '' ? fbdl.hd : fbdl.sd}_`
      fbdl.hd != '' ? await conn.sendFile(msg.from, fbdl.hd, "", txt, msg) : await conn.sendFile(msg.from, fbdl.sd, "", txt, msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}