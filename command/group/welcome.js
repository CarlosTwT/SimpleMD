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
	name: "welcome",
	alias: ["welcome"],
	desc: "activar la función de bienvenida a nuevos miembros",
	use: "on/off",
	category: "group",
	query: "ingrese opciones\non = activo\noff = deshabilitado",
	isAdmin: true,
	isSpam: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/welcome.json"));
		let data2 = db.cekDatabase("welcome", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "estado activo antes";
			db.modified("welcome", { id: msg.from, teks: "Bienvenido a @subject Buena suerte @user", lastUpdate: false });
			await msg.reply(`Bienvenida activada correctamente`);
		} else if (args[0] == "off") {
			if (!data2) throw "no activo antes";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
			await msg.reply("eliminada con éxito la sesión de bienvenida en este grupo");
		}
	},
};
