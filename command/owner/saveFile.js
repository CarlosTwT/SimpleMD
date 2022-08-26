module.exports = {
  name: "savefile",
  alias: ["sf","sv","safe","save"],
  category: "private",
  query: `Introduzca un nombre de archivo, Ejemplo : \n × .save index.js\n × .save command/main/main.js ( Comando )\n × .save lib/function/function.js\n × .save lib/function.js\n\n*Nota: Lo anterior es solo un ejemplo.!*_`,
  isOwner: true,
  isQuoted: true,
  async run({msg, conn},{q, args}){
    try {
      teks = `./${q}`
      await require("fs").writeFileSync(teks, msg.quoted.text);
	  	await msg.reply(`_*Guardado exitosamente..*_`);
	  //	process.send("reset");
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}