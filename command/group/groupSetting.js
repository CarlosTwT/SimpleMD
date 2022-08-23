module.exports = {
  name: "group",
  alias: ["group","grup"],
  category: "group",
  desc: "Get Open/Close this group",
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true,
  async run({msg,conn},{args,q}){
    switch (q) {
      case '1':
      case 'open':
        await conn.groupSettingUpdate(msg.from, "not_announcement")
        await msg.reply("Listo..")
        break;
        
      case '0':
      case 'close':
        await conn.groupSettingUpdate(msg.from, "announcement")
        await msg.reply("Listo..")
        break
      
      default:
        if(!q) throw `
*¡Formato erróneo! Ejemplo :*
  *× .${msg.command} cerrar/0*
  *× .${msg.command} abrir/1*

${global.footer}
`.trim()
    }
  }
}