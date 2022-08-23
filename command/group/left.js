const getPosition = (name, _dir) => {
	let position = null;
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === name) {
			position = i;
		}
	});
	if (position !== null) {
		return position;
	}
};

module.exports = {
	name: "left",
	alias: ["left"],
	desc: "activar la función de nuevo miembro dejado",
	use: "<on/off>",
	category: "group",
	query: "ingresar opciones\non = activo\noff = inactivo",
	isAdmin: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let data2 = db.cekDatabase("left", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "estado activo antes";
			db.modified("left", { id: msg.from, teks: "Adiós @user", lastUpdate: false });
			await msg.reply(`Despedida encendida con éxito`);
		} else if (args[0] == "off") {
			if (!data2) throw "no activo antes";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
			await msg.reply("despedida desactivada con exito");
		}
	},
};
