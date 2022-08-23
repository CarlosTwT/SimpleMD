module.exports = {
	name: "promote",
	alias: ["pm","promote"],
	category: "group",
	desc: "Ascender para ser un administrador de grupo",
	use: "<tag integrante>",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }) {
		const mm = msg.quoted ? [msg.quoted.sender] : msg.mentions;
		for (let i of mm) await conn.groupParticipantsUpdate(msg.from, [i], "promote");
		await msg.reply("Listo");
	},
};
