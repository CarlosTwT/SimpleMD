module.exports = {
	name: "vgif",
	category: "converter",
	desc: "Cambia el video a gif con sonido",
    isQuoted: true,
  isMedia: {
    isQVideo: true,
  },
	async run({ msg,conn }) {
        let buff = await  msg.quoted.download()
        await conn.sendMessage(
            msg.from,
            {
                video: buff,
                gifPlayback: true,
            },
            { quoted: msg}
        )
	}
};
