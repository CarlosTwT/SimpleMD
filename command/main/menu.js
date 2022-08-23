const { monospace } = require('../../lib/function')
const fs = require("fs");
let multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

module.exports = {
  name: ['menu'].map((v) => v + ''),
  alias: ["cmd","menu"],
  category: "main",
  desc: "Mostrar comandos",
  async run({msg,conn}, {map}) {
    let { body , reply} = msg
    let pref = multi_pref.test(body) ? body.split("").shift() : ".";
    let locale = "id"
    let d = new Date(new Date() + 3600000)
    let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    const { pushName, sender } = msg;
	  const { prefix, command } = map;
		const cmds = command.keys();
		let category = [];
    
    for (let cmd of cmds) {
				let info = command.get(cmd);
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "No Category";
				if (info.type == "changelog") continue;
				if (!cteg || cteg === "private") cteg = "owner";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			
			menu = global.footer + " *[ Beta✓ ]*\n\n"
			menu += monospace(" ❏ Librería : Baileys-MD") + "\n"
			menu += monospace(" ❏ Autor : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" ❏ Prefijo : [ " + pref + " ]") + "\n"
			menu += monospace(" ❏ Fecha : " + date) + "\n"
			menu += monospace(" ❏ Tiempo : " + time) + "\n\n"
			menu += monospace(`Hola, @${sender.split("@")[0]} Aquí mi lista de comandos`) +`\n\n`;
			const keys = Object.keys(category)
			for(let key of keys){
			  menu += `*乂 ${key.toUpperCase()}*\n`
			  menu += `${category[key].map((cmd) => monospace(` × ${cmd.options.noPrefix ? "" : pref}${cmd.name}`)).join("\n")}` + "\n\n"
			}
			menu += `_Nota: Usa ${prefix}help <comando> para ver información de comando_`
			
			
			const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Owner'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Speed'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://telegra.ph/file/642a95448d0d2d4750a37.jpg"},
           caption: menu,
           footer: "Bot aún en etapa de desarrollo",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})

/*const { generateWAMessageFromContent } = require ("@adiwajshing/baileys")

prep = generateWAMessageFromContent(msg.from, { liveLocationMessage: { 
degreesLatitude: 0, degreesLongitude: 0,
caption: menu,
sequenceNumber: 0, timeOffset: 0, jpegThumbnail: null
}}, { quoted: msg
					})

return conn.relayMessage(msg.from, prep.message, { messageId: prep.key.id })*/


  }
}
