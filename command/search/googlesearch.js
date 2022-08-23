let google = require('google-it')

module.exports = {
	name: "googlesearch",
	alias: ["gs", "googlesearch","google"],
	category: "search",
	wait: true,
	query: `Ingrese el texto que desea buscar`,
	async run({ msg, conn }, { q }) {
	        try {
	          google({'query': q}).then(res => {
            let teks = `Búsqueda de Google desde : ${q}\n\n`
            for (let g of res) {
              teks += `▢ *Título* : ${g.title}\n`
              teks += `▢ *Descripción* : ${g.snippet}\n`
              teks += `▢ *Link* : ${g.link}\n\n────────────────────────\n\n`
                } 
              msg.reply(teks)
                })
	        } catch (e){
	          global.error(msg.command, e, msg)
	        }
			}
}