let yts = require("yt-search")
let { monospace } = require('../../lib/function')


module.exports = {
  name: "ytsearch",
  alias: ["yts","ytsearch","youtubesearch","getmp3","getmp4","getmusic","getvideo"],
  category: "search",
  desc: "buscar en youtube",
  async run({msg, conn},{q, cmdNya}) {
    let { quoted, from, reply } = msg;
    switch(cmdNya){
      case "yts":
      case "ytsearch":
      case "youtubesearch":
        if(!q) throw `Ejemplo : .${cmdNya} <query>`
        try {
          await msg.reply(respon.wait)
          let yt = await yts(q)
          let txt = `*YouTube Search*\n\n`
          txt += monospace(`Busca en ${q}\nPara recuperar medios, responda al mensaje con Ejemplo:\n.getmp3 <secuencia>\n.getmp4 <secuencia>\n\n\n`)
          n = 0
          for ( var i of yt.all ) {
            txt += monospace(`No.${n+=1}\n`)
            txt += monospace(' × Título : ' + i.title + '\n')
            txt += monospace(' × Url : ' + i.url + '\n')
            txt += monospace(' × Id : ' + i.videoId + '\n')
            txt += monospace(' × Hace : ' + i.ago + '\n')
            p = await tool.formatRupiah(`${i.views}`, ".")
            txt += monospace (' × Views : ' + p + '\n\n')
           }
           await conn.sendFile(msg.from, yt.all[0].thumbnail, "",txt,msg)
        } catch (e){
          global.error(cmdNya, e, msg)
        }
        break;
        
        case "getmp3":
        case "getmusic":
          if(!q) throw `Ejemplo : .${cmdNya} 1`
          if(!msg.quoted) throw "Responde a mensaje"
          if(!msg.quoted.isSelf) throw "Responder mensaje BOT"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Tal vez el mensaje que respondiste no contiene el resultado de ytsearch`
          y = await sc.youtube("mp3",urls[q - 1], "265")
          txt = "*乂 YouTube - Downloader*\n\n"
          txt += "``` × Título : " + y.title + "```\n"
          txt += "``` × Genero : " + y.genre + "```\n"
          txt += "``` × Tamaño : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "``` × Views : " + p + "```\n"
          txt += "``` × Calidad : " + y.quality + "```\n"
          txt += "``` × Duración : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
          txt += "``` × Hace : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
          txt += "``` × Url : " + y.url + "```\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp3","", msg)
          break
        
        case "getmp4":
        case "getvideo":
          if(!q) throw `Example : .${cmdNya} 1`
          if(!msg.quoted) throw "Responde mensaje"
          if(!msg.quoted.isSelf) throw "Mensaje mio xd"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Tal vez el mensaje que respondió no contiene el resultado ytsearch`
          y = await sc.youtube("mp4",urls[q - 1], "480")
          txt = "*乂 YouTube - Downloader*\n\n"
          txt += "``` × Título : " + y.title + "```\n"
          txt += "``` × Genero : " + y.genre + "```\n"
          txt += "``` × Tamaño : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "``` × Views : " + p + "```\n"
          txt += "``` × Calidad : " + y.quality + "```\n"
          txt += "``` × Duración : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
          txt += "``` × Hace : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
          txt += "``` × Url : " + y.url + "```\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp4","", msg)
          break
    }
  }
}
