let { monospace, isUrl } = require('../../lib/function')

module.exports = {
  name: "ig",
	alias: ["ig","igdl"],
	category: "downloader",
	use: "<url>",
	async run({msg,conn},{q,args,map,cmdNya}){
	  let { prefix } = map;
    let { from, reply} = msg;
    if(!q) throw "Sin url de consulta>.<"
	  try {
	    let igdl = await sc.instagram(q)
	    if(/reel/.test(q)) return await conn.sendFile(msg.from, igdl.media[0].url,"", "*Listo*", msg)
	    ngontol = igdl.media.length > 1 ? true : false
      if(ngontol) await msg.reply("El número de medios es más de 1, los medios se enviarán a través de un chat privado (PC)\nVerifique el chat del bot><!")
      for(let i of igdl.media) {
        conn.sendFile(ngontol ? msg.sender : msg.from, i.url,"", "*Listo*",msg)
          }
	  } catch (e){
	    global.error(msg.command, e, msg)
	  }
	}
}
