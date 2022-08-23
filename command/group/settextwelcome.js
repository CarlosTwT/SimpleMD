module.exports = {
  name: "settextwelcome",
  alias: ["setwelcome"],
  category: "group",
  query: "ingresar texto\n@subject tema del grupo\n@ownergc owner del grupo\n@user tag al participante que entró\n@creation cuando se creo el grupo\n@desc Descripción",
  isGroup: true,
  isAdmin: true,
  async run({msg,conn},{q}){
    try {
      let dataNeeded = db.cekDatabase("welcome", "id", msg.from);
      if (!dataNeeded) throw "Welcome en Este grupo aún no está activado,\nActivo a la orden: *.welcome on*";
      let data = JSON.parse(require('fs'). readFileSync('./lib/database/welcome.json'))
      let da = data.find((a) => a.id == msg.from);
      da.teks = q;
	  	da.lastUpdate = Date.now();
	  	require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
      await	msg.reply("Listo✓")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}



		
    
    
		
	  