module.exports = {
  name: "mode",
  alias: ["self","public","publik"],
  category: "owner",
  isOwner: true,
  async run({conn, msg},{q,map}){
    try {
      switch(msg.command){
        case "mode":
          msg.reply(".self / .public")
         break

        case "self":
          if (map.isSelf) throw "Ya en modo privado";
				  map.isSelf = true;
			  	await msg.reply("Cambio con éxito al modo propio");
          break

        case 'publik':
        case "public":
          if (!map.isSelf) throw "Ya en modo público";
			   	map.isSelf = false;
			  	await msg.reply("Cambio exitoso al modo público");
          break
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}