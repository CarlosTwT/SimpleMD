module.exports = {
	name: "jid",
	category: "info",
	desc: "Da el JID",
	async run({ msg }) {
if(!msg.quoted){
    return msg.reply(msg.from)
}else{return msg.reply(msg.quoted.sender)}
	}
};
