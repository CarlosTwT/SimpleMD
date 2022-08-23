let { monospace } = require("../../lib/function")

module.exports = {
  name: "searchgore",
  alias: ["sgore","goresearch"],
  category: "search",
  desc: "Búsqueda gore..",
  async run({msg, conn},{q}){
    if(!q) throw `_Ejemplo : .${msg.command} brutal_`
    await msg.reply(respon.wait)
    try {
      gore = await sc.searchgore(q);
      txt = `*乂 Search Gore*\n\n × Búsqueda : ${q}\n × Si desea descargar el gore, escriba .goredl <enlace>\n\n`
      for (let i of gore.data){
        txt += monospace(` × Título : ${i.judul}`) + "\n"
        txt += monospace(` × Hace : ${i.uploader}`) + "\n"
        txt += monospace(` × Thumbnail : ${i.thumb}`) + "\n"
        txt += monospace(` × Link : ${i.link}`) + "\n"
        txt += monospace(`-------------------------`) + "\n\n"
      }
      conn.sendFile(msg.from, gore.data[0].thumb,'', txt, msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}