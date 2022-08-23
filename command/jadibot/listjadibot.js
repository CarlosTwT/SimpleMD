module.exports = {
  name: "listjadibot",
  alias: ["listjadibot","listbot"],
  category: "jadibot",
  desc: "mostrando a los usuarios que se suben a los bots!!",
  async run({conn, msg}){
    try {
      let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
      te = "*Lista de Jadibot*\n\n"
      for(let i of user){
        y = await conn.decodeJid(i.id)
        te += " × Usuario : @" + y.split("@")[0] + "\n"
        te += " × Nombre : " + i.name + "\n\n"
      }
      user != "" ? await msg.reply(te,{withTag : true}) : await msg.reply("_*No hay usuarios que sean sub-bots..*_")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
