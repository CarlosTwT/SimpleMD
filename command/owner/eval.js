module.exports = {
	name: "eval",
	alias: [">>", ">","eval"],
	category: "default",
	noPrefix: true,
	isOwner: true,
	desc: "ejecutar código javascript a través de un comando también puede probar algo de código",
	use: `">" <code javascript> con await y ">>" <code> live return o mostrar inmediatamente el resultado`,
	query: `Introduzca el código de parámetro`,
	async run({ msg, conn }, { q, map, args, Baileys, arg, prefix, response, chat }) {
	  function _(stdout){
	    msg.reply("```" + `root@Carlos:\n${stdout}` + "```")
	  }
		let kode = msg.body.trim().split(/ +/)[0];
		let teks;
		try {
			teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`);
		} catch (e) {
			teks = e;
		} finally {
			await _(require("util").format(teks).trim());
		}
	},
};
