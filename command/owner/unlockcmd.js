module.exports = {
	name: "unlockcmd",
	alias: ["ulockcmd"],
	category: "private",
	isOwner: true,
	desc: "funciones de desbloqueo ",
	use: `<nombre del comando>`,
	query: `Comando Introducir nombre de parámetro`,
	async run({ msg, conn }, { q, map, args, arg }) {
		var data = [...map.command.keys()];
		[...map.command.values()]
			.map((x) => x.alias)
			.join(" ")
			.replace(/ +/gi, ",")
			.split(",")
			.map((a) => data.push(a));
		if (!data.includes(q)) throw "Comando no encontrado";
		if (!map.lockcmd.posee(q)) throw "Este comando no ha sido bloqueado antes";
		map.lockcmd.delete(q);
		await msg.reply(`Comando de desbloqueo exitoso "${q}"`);
	},
};
