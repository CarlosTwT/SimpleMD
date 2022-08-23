module.exports = {
	name: "delcmd",
	alias: ["dcmd"],
	category: "private",
	desc: "Borrar archivos",
	isOwner: true,
	use: "<nombre de archivo>\nEjemplo .delcmd main/menú",
	async run({ msg, conn }, { q, cmdNya }) {
	  if(!q) throw `Ejemplo : ${msg.command} main/menu`
	  try {
	    q = q.split("/");
	    teks = `./command/${q[0]}/${q[1]}.js`
	   	await require("fs").unlinkSync(teks);
	  	await msg.reply(`Eliminado con éxito, y se está reiniciando`);
	  	process.send("reset");
	  } catch (e){
	    await msg.reply("*Error, tal vez el archivo no existe!!*\n\n" + String(e))
	    //global.error(cmdNya, e, msg)
	  }
	},
};
