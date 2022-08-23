module.exports = {
  name: "localonly",
  alias: ["localonly","antiluar"],
  category: "group",
  desc: "activar el grupo número localonly",
  use: "<on / off>",
  query: "ingrese opciones\non = activo\noff = deshabilitado",
  isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({msg, conn},{args}){
	  let data = JSON.parse(require("fs").readFileSync("./lib/database/localonly.json"));
		let data2 = data.includes(msg.from);
	  if(args[0] == "on"){
	    if (data2) throw "estado activo antes";
			db.modified("localonly", msg.from);
			await msg.reply(`Local solo se activó correctamente`);
	  } else if(args[0] == "off"){
	    if (!data2) throw "no activo antes";
			data.splice(data.indexOf(msg.from), 1);
			require("fs").writeFileSync("./lib/database/localonly.json", JSON.stringify(data, null, 2));
			await msg.reply("eliminar con éxito la sesión Local solo en este grupo");
	  }
	}
}