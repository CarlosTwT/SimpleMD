module.exports = {
	name: "settextleft",
	alias: ["setleft"],
	desc: "Cambiar texto de despedida",
	category: "group",
	use: "<text>",
	query: "Ingresa el texto\n@subject tema del grupo\n@ownergc owner del grupo\n@user tag al participante que salió\n@creation cuando se creo el grupo\n@desc Descripción",
	isAdmin: true,
	isGroup: true,
	async run({ msg, conn }, { q }) {
		let dataNeeded = db.cekDatabase("left", "id", msg.from);
		if (!dataNeeded) throw "Despedida en Este grupo aún no está activado,\nActivalo por comando: *left on*";
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let da = data.find((a) => a.id == msg.from);
		da.teks = q;
		da.lastUpdate = Date.now();
		require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
		await msg.reply("Listo✓")
	},
};
