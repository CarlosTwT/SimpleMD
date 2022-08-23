const fs = require("fs")
const prettyms = require('pretty-ms')

module.exports = async function (msg, conn){
  const afk = JSON.parse(fs.readFileSync("./lib/database/afk.json"));
  if (afk[msg.sender] != undefined){
    const afktime = await prettyms(Date.now() - afk[msg.sender].time, {
				verbose: true,
			});
    const afkreason = afk[msg.sender].reason;
			tek = `has vuelto de afk!\nDespués de*${afkreason}*, Durante _${afktime}_`
			msg.reply(tek);
			delete afk[msg.sender];
			await fs.writeFileSync("./lib/database/afk.json", JSON.stringify(afk));
  }
  	if (msg.quoted && afk[msg.quoted.sender] != undefined) {
			const pushname = store.contacts[msg.quoted.sender];
			const afktime = await prettyms(Date.now() - afk[msg.quoted.sender].time, {
				verbose: true,
			});
			const afkreason = afk[msg.quoted.sender].reason;
			teks = `${pushname != undefined ? pushname.name : "he`s"} No lo etiqueten, está afk!\n`
			teks += "Razón : " + afkreason + "\n"
			teks += "Durante : " + afktime + "\n\n"
			teks += "Vuelva a llamar después de que regrese de afk!!"
			await msg.reply(teks);
		}
		if (msg.mentions != "" && afk[msg.mentions[0]] != undefined) {
			const pushname = global.store.contacts[msg.mentions[0]];
			const afktime = await prettyms(Date.now() - afk[msg.mentions[0]].time, {
				verbose: true,
			});
			const afkreason = afk[msg.mentions[0]].reason;
			txt = `${pushname != undefined ? pushname.name : "he`s"} No lo etiqueten, está afk!\n`
			txt += "Razón : " + afkreason + "\n"
			txt += "Durante : " + afktime + "\n\n"
			txt += "Vuelva a llamar después de que regrese de afk!!"
			await msg.reply(txt);
		
	}
}
