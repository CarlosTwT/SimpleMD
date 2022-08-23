const lyrics = require("music-lyrics")

module.exports = {
  name: "lirica",
  alias: ["lirik","liric"],
  category: "search",
  desc: "Buscar letras",
  async run({msg},{q, cmdNya}){
    if(!q) throw "Ejemplo: .letra de pintura crepúsculo"
        try{
            lir = await lyrics.search(q)
            lir != '' ? await msg.reply(lir) : await msg.reply('Letras no encontradas')
        }catch(e){
            global.error(cmdNya, e, msg)
        }
  }
}