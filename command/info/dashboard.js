const prettyms = require("pretty-ms")
const { monospace } = require('../../lib/function')

module.exports = {
	name: "dashboard",
	alias: ["db"],
	desc: "display " + config.namebot + " Panel de mi info",
	category: "info",
	isSpam: true,
	wait: false,
	async run({ msg, conn }) {
		dashboard.sort(function (a, b) {
			return b.success - a.success;
		});
		let success = dashboard.map((a) => a.success);
		let failed = dashboard.map((a) => a.failed);
		let Monto = require("mathjs").evaluate(success.join("+")) + require("mathjs").evaluate(failed.join("+"));
		
		txt = "*" + config.namebot + " Panel*\n\n"
		txt += "*乂 Hits Globales*\n";
		txt += monospace(`   × Global : ${Monto}`) + `\n`
		txt += monospace(`   × Hechos : ${require("mathjs").evaluate(success.join("+"))}`) + `\n`
		txt += monospace(`   × Fallados : ${require("mathjs").evaluate(failed.join("+"))}`) + "\n\n";
		let dbny = dashboard.length > 5 ? 5 : dashboard.length;
		for(let i = 0; i < dbny; i++){
		  txt += `*乂 Comando : ${dashboard[i].name}*\n`
		  txt += monospace(`   × Total : ${dashboard[i].success + dashboard[i].failed}`) + `\n`;
		  txt += monospace(`   × Hechos : ${dashboard[i].success}`) + `\n`; 
		  txt += monospace(`   × Fallados : ${dashboard[i].failed}`) +`\n`;
		  txt += monospace(`   × Último uso : ${await prettyms(Date.now() - dashboard[i].lastUpdate, {
				verbose: true,
			})}`) + `\n\n`;
		}
		await msg.reply(txt, {adReply : true});
	},
};
