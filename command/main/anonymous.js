const fs = require('fs')
module.exports = {
  name: "anonymous",
  alias: ["anonymous","start","next","leave","stop"],
  desc: "#start para empezar a buscar pareja anonima\n#stop dejar el chat\n#next para encontrar otro socio",
  category: "anonymous",
  isPrivate: true,
  async run({msg,conn},{q}){
    const { command } = msg
    const desc = '#start para empezar a buscar pareja anonima\n#stop dejar el chat\n#next para encontrar otro socio'
        const anony = JSON.parse(fs.readFileSync('./lib/database/anonymous.json'))
        const isanon = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender))
        buttonAll = [ 
                { buttonId: `.start`, buttonText: { displayText: 'INCIAR' }, type: 1 },
                { buttonId: `.next`, buttonText: { displayText: 'SIGUIENTE' }, type: 1 },
                { buttonId: `.leave`, buttonText: { displayText: 'SALIR' }, type: 1 }
           ]
        buttonNext = [ 
                { buttonId: `.next`, buttonText: { displayText: 'SIGUIENTE' }, type: 1 },
                { buttonId: `.leave`, buttonText: { displayText: 'SALIR' }, type: 1 }
           ]
           
           
    switch(command){
      case "anonymous":
        await conn.sendMessage(msg.from, {text: "*Charla anónima*\n\n" + desc,footer: "_haga clic aquí.._",buttons: buttonAll,headerType: 1},{quoted : msg })
        break

      case "start":
        if(isanon) return msg.reply('Todavía estás en el chat!')
            await msg.reply('buscando socios...')
            find = Object.values(anony).find(anon => anon.status == 'search')
            if(find == undefined){
                anony[msg.sender] = {
                    id: msg.sender,
                    a: msg.sender,
                    b: '',
                    status: 'search'
                }
                await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
            }
            else{
                find.b = msg.sender
                find.status = 'chatting'
                anony[find.id] = {...find}
                await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
                find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender))
                await conn.sendMessage(find.a, {text: "_Socios encontrados.._",footer: config.namebot,buttons: buttonNext,headerType: 1},{quoted : msg })
                await conn.sendMessage(find.b, {text: "_Socios encontrados.._",footer: config.namebot,buttons: buttonNext,headerType: 1},{quoted : msg })
            }
        break

      case "next":
        if(!isanon) return msg.reply("Aún no has iniciado el chat anónimo\npor favor empieza primero!")
            find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender) && anon.status == 'chatting')
            if(find == undefined) return msg.reply('no tienes pareja!')
            pas = find.a == msg.sender ? find.b : find.a
            if(!pas) return msg.reply('no tienes pareja!')
            await conn.sendMessage(pas, {text: "_El socio abandonó el chat.._",footer: config.namebot,buttons: buttonAll,headerType: 1},{quoted : msg })
            delete anony[find.id]
            await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
        break
 
      case "leave":
      case "stop":
        if(!isanon) return msg.reply("Aún no has iniciado el chat anónimo\nEmpieza primero!")
            find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender))
            pas = find.a == msg.sender ? find.b : find.a
            if(find.b != '') await conn.sendMessage(pas, {text: "_El socio abandonó el chat.._",footer: config.namebot,buttonAll: buttonAll,headerType: 1},{quoted : msg })
            delete anony[find.id]
            await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
        break
    }
  }
}
