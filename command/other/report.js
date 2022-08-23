module.exports = {
  name: "report",
  alias: ["reportacc","reportreject","report","reportblock"],
  category: "other",
  async run({msg,conn},{q,args, respon, cmdNya}){
    let { from, reply, sender, body} = msg;
    let own = config.owner.includes(sender);
	  try {
	    switch(cmdNya){
	      case "report":
	        if(!q) throw "¿Qué quieres reportar???"
	        let group = await conn.groupMetadata(from);
	        report = "├ Usuário  : @" + sender.split("@")[0] + "\n";
	        report += "├ Reporte : " + q + "\n"
	        //report += "├ Group : " + group.subject + "\n"
	        report += "╰ Id : " + from 
	        conn.sendMessage(config.owner[0],{
	          text: report,
            footer: global.footer,
            buttons: [
              { buttonId: `.reportreject ${msg.from} ${sender} ${msg.key.id}`, buttonText: { displayText: 'Rechazar' }, type: 1 },
              { buttonId: `.reportblock ${group.id} ${sender} ${msg.key.id}`, buttonText: { displayText: 'Rechazar (Block)' }, type: 1 },
              { buttonId: `.reportacc ${group.id} ${msg.key.id}`, buttonText: { displayText: 'Aceptar' }, type: 1 }
              ],
            headerType: 1,
            withTag : true 
	        },{quoted : msg});
	        await reply('El informe ha sido enviado al propietario.')
	        break;
	        
	      case "reportacc":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Responder al mensaje"
          if(!args[0]) return
          if(!args[1]) return
          lap = '*El informe ha sido recibido por el propietario y será procesado.*\n\n'
          lap += "Detalles del informe\n"
          lap +=  msg.quoted.message.buttonsMessage.contentText
          su = store.messages[args[0]].array.find(pe => pe.key.id === args[1]) 
          conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: su})
          await msg.reply("Listo..")
	        break;
	        
	      case "reportblock":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Responder al mensaje"
          if(!args[0]) return
          if(!args[1]) return
          if(!args[2]) return
          lap = '*Informe rechazado, serás bloqueado por bot*\n\n'
          lap += `Detalles del informe\n`
          lap +=  msg.quoted.message.buttonsMessage.contentText
          su = store.messages[args[0]].array.find(pe => pe.key.id === args[2]) 
          conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: su})
          await conn.updateBlockStatus(args[1], "block")
          await msg.reply("Listo..")
	        break;
	        
	      case "reportreject":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Responder al mensaje"
          if(!args[0]) return
          if(!args[1]) return
          if(!args[2]) return
          lap = '*Informe rechazado*\n\n'
          lap += `Detalles del informe\n`
          lap +=  msg.quoted.message.buttonsMessage.contentText
          su = store.messages[args[0]].array.find(pe => pe.key.id === args[2]) 
          conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: su})
          await msg.reply("Listo..")
	        break
	    }
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
  }
}