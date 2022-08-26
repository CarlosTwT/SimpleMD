const fs = require("fs")

module.exports = async function(msg, conn) {
  const word = JSON.parse(require("fs").readFileSync('./lib/database/toxic.json'))
  const { body, sender, isGroup, from, reply } = msg;
  if(word[msg.from] == undefined) return
   for(let kasar of word[msg.from].kata){
     if(body.includes(kasar)){
       if(word[msg.from].warning[msg.sender] == undefined){
         word[msg.from].warning[msg.sender] = {
                        kata: [kasar],
                        count: 1
                    }
       } else {
         word[msg.from].warning[msg.sender].kata.push(kasar)
         word[msg.from].warning[msg.sender].count++
       }
       await fs.writeFileSync('./lib/database/toxic.json', JSON.stringify(word))
       if(word[msg.from].warning[msg.sender].count == 5){
         teks = "*⚠️ WARNING!!*\n\n"
         teks += "Kata terlarang terdeteksi..\n"
         teks += " × kata : " + kasar + "\n"
         teks += " × Warning : 5/5 \n\n"
         teks += "*Maaf, kamu akan di kick oleh BOT!!*"
         msg.reply(teks)
         setTimeout(() => {
           conn.groupParticipantsUpdate(msg.from, [msg.sender], "remove")
         }, 3000);
         word[msg.from].warning[msg.sender] = {
                        kata: [],
                        count: 0
                    }
          await fs.writeFileSync('./lib/database/toxic.json', JSON.stringify(word))
                } else {
         text = "*⚠️ WARNING!!*\n\n"
         text += "Palabra prohibida detectada..\n"
         text += " × palabra : " + kasar + "\n"
         text += " × Advertencia : " + word[msg.from].warning[msg.sender].count + "/5 \n\n"
         text += "*Nota: si la advertencia ha llegado a 5, el bot lo eliminará automáticamente..*"
         return msg.reply(text)
       }
     }
   }
}