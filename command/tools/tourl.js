module.exports = {
	name: "tourl",
	alias: ["tourl", "tolink","upload"],
	desc: "Convertir medios a URL",
	use: "responder mensajes de los medios",
	isMedia: {
		isQVideo: true,
		isQImage: true,
	},
	category: "tools",
	wait: true,
	async run({ msg, conn }, { q, cmdNya }) {
	  try {
		 y = await msg.quoted.download()
     buff = await tool.telegraph (y)
     msg.reply(buff)
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	},
};
