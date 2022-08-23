module.exports = {
  name: "join",
	alias: ["join","accgc","rejectgc"],
	category: "other",
	desc: "Únase al grupo usando la url de invitación.",
	isPrivate: true,
	async run({msg,conn},{args, q, cmdNya}) {
	  let { from, reply, sender, body} = msg;
	  let own = config.owner.includes(sender);
	  try {
	    switch(cmdNya){
	      case "join":
	        const rex = /chat.whatsapp.com\/([\w\d]*)/g;
	        let cod = q.match(rex);
	        if (cod === null) return await msg.reply("No se detectó ninguna URL de invitación.");
	        txt = "*Invitación para unirse al grupo de WhatsApp*\n\n"
	        txt += " • Usuario : @" + msg.sender.split("@")[0] + "\n"
	        txt += " • De : " + msg.from + "\n"
	        txt += " • Link del Grupo : " + q
          reply("*Listo, espera a que el propietario acepte el enlace :)*")
          return conn.sendMessage(config.owner[0], {
                 text: txt,
                 footer: global.footer,
                 buttons: [ 
                     { buttonId: `.accgc ${q} ${msg.from} ${msg.key.id}`, buttonText: { displayText: 'Aceptar (Entrar)' }, type: 1 },
                     { buttonId: `.rejectgc ${msg.from} ${msg.key.id}`, buttonText: { displayText: 'Rechazar (No entrar)' }, type: 1 }
                   ],
                  headerType: 1
                 ,withTag : true },{quoted : msg })
	        break;
	        
	      case "accgc":
	        if(!own)return reply(respon.owner)
	        const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
  	    	lap = '*El grupo ha sido aceptado por el propietario.*\n\n'
          lap += "*Detalles*"
          lap +=  " " + msg.quoted.message.buttonsMessage.contentText.split("*Invitación para unirse al grupo de WhatsApp*")[1]
          let su = store.messages[args[1]].array.find(pe => pe.key.id === args[2]) 
          conn.sendMessage(args[1], {text: lap, withTag : true}, {quoted: su})
	      	let code = q.match(rex1);
		      if (code === null) return await msg.reply("No se detectó ninguna URL de invitación.");
	      	code = code[0].replace("chat.whatsapp.com/", "");
		      let anu = await conn.groupAcceptInvite(code);
	       	if (!anu) return msg.reply("Parece que el grupo ya está lleno o dejó de ser válido cuando intento unirme :/")
           await msg.reply("Listo..")
	        break;
	        
	      case "rejectgc":
	        if(!own)return reply(respon.owner)
	        lap = '*Grupo rechazado por el propietario*\n\n'
          lap += "*Detalles*"
          lap +=  " " + msg.quoted.message.buttonsMessage.contentText.split("*Invitación para unirse al grupo de WhatsApp*")[1]
          let suu = store.messages[args[0]].array.find(pe => pe.key.id === args[1]) 
          let y = await conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: suu})
          let w = await conn.sendContact(args[0], config.owner, y);
          conn.sendMessage(args[0], { text: `_Propietario del chat si desea ingresar BOT_` }, { quoted: w });
          await msg.reply("Listo..")
	       break
	    }
	    
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	}
}

