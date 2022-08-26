const fs = require('fs')

module.exports = {
  name: "blacklist",
  alias: ["blacklist", "addtoxic","deltoxic", "deletetoxic","listtoxic"],
  category: "group",
  desc: ['Para agregar/eliminar el filtro de palabras prohibidas en el grupo', '.addtoxic <palabra>'],
  isAdmin: true,
  isGroup: true,
  async run({conn, msg},{args, q}){
    const { sender, reply, command, from} = msg;
    
    switch(command){
      case "blacklist":
        txt = global.footer + "\n\n"
        txt += "*⚠️ Lista negra disponible :*\n"
        txt += " × addtoxic" + "\n"
        txt += " × deletetoxic" + "\n"
        txt += " × listtoxic" + "\n\n"
        txt += "*Ejemplo de uso :* \n"
        txt += " × .addtoxic <palabra toxica>" + "\n"
        txt += " × .deletetoxic <palabras disponibles>" + "\n"
        txt += " × .listtoxic [ Mostrando la palabra tóxica registrada ]"
        reply(txt)
        break;
      
      case "addtoxic":
        if(!q) throw "Introduce palabras prohibidas!!"
          try {
            const word = JSON.parse(fs.readFileSync('./lib/database/toxic.json'))
            if(word[from] == undefined){
              word[from] = {
                kata: [],
                warning: {}
              }
            await fs.writeFileSync('./lib/database/toxic.json',JSON.stringify(word))
            }
            if(word[from].kata.includes(q)) return reply(`La palabra ${q} ya en la lista negra!`)
            word[from].kata.push(q)
            await fs.writeFileSync('./lib/database/toxic.json',JSON.stringify(word))
            reply(`La palabra ${q} entró con éxito en la palabra prohibida`)
            
          } catch (e){
            global.error(command, e, msg)
          }
        break

     case "deletetoxic":
     case "deltoxic":
       if(!q) throw "Introduce palabras prohibidas!!"
       try {
         const word = JSON.parse(fs.readFileSync('./lib/database/toxic.json'))
         if(!word[from].kata.includes(q)) return msg.reply(`La palabra ${q} no en la lista negra de palabras!`)
         word[from].kata.splice(word[from].kata.indexOf(q), 1)
         await fs.writeFileSync('./lib/database/toxic.json',JSON.stringify(word))
         reply(`La palabra ${q} eliminado con éxito de la lista negra de palabras`)
       } catch (e){
         global.error(command, e, msg)
       }
       break

    case "listtoxic":
      const data = await conn.groupMetadata(from)
      const word = JSON.parse(require("fs").readFileSync('./lib/database/toxic.json'))
      txt = "*Lista negra en grupo : " + data.subject + "*\n\n"
      txt += "*Total : " + word[from].kata.length + "*\n"
      txt += "*Lista :* \n"
      txt += " × " + word[from].kata.join(`\n × `) + "\n\n"
      txt += global.footer
      reply(txt)
      break
        
    }
  }
}