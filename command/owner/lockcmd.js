module.exports = {
	name: "lockcmd",
	category: "private",
	isOwner: true,
	desc: "deshabilitar funciones ",
	use: `<comando de nombre | razón>`,
	query: `Ingrese el nombre del parámetro Comando y motivo, ejemplo: #lockcmd help | apagado`,
	async run({ msg, conn }, { q, map, args, arg }) {
		if (!args[2]) throw "Introduzca un motivo, ejemplo: #lockcmd play | no da música";
		var data = [...map.command.keys()];
		[...map.command.values()]
			.map((x) => x.alias)
			.join(" ")
			.replace(/ +/gi, ",")
			.split(",")
			.map((a) => data.push(a));
		if (!data.includes(q.split("|")[0].trim())) throw "Comando no encontrado";
		if (map.lockcmd.posee(q.split("|")[0].trim())) throw "Este comando ha sido bloqueado antes";
		map.lockcmd.set(q.split("|")[0].trim(), q.split("|")[1].trim());
		await msg.reply(`Comando bloqueado con exito "${q.split("|")[0].trim()}" razón "${q.split("|")[1].trim()}"`);
	},
};
