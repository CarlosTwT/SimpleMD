const { monospace } = require("../../lib/function")

module.exports = {
  name: ["help"].map((v) => v + " <command>"),
  alias: ["help"],
  category: "main",
  desc: ['Ver información del Comando', '.help <Command>'],
  async run({msg,conn},{ args, q, map}) {
      if(!q) return msg.reply("Ejemplo : .help menu",{adReply: true})
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "private" && !config.owner.includes(msg.sender)))
				return await msg.reply("Comando no encontrado");
			helpcmd = global.footer + "\n\n"
			helpcmd += "*Comando de ayuda*\n\n"
			helpcmd += monospace(` × Comando : ${q}`) + "\n"
			helpcmd += monospace(` × Comando de activación : ${cmd.alias.join(", ")}`) + "\n"
			helpcmd += monospace(` × Categoría : ${cmd.category}`) + "\n\n"
			helpcmd += "*Atributo de comando*\n"
			helpcmd += monospace(` × isOwner : ${cmd.options.isOwner ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isAdmin : ${cmd.options.isAdmin ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isBotAdmin : ${cmd.options.isBotAdmin ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isGroup : ${cmd.options.isGroup ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isPrivate : ${cmd.options.isPrivate ? '✅' : '❌'}`) + "\n\n"
			helpcmd += "*Comando Descripción*\n"
			helpcmd += monospace(` × Descripción : ${cmd.desc}`) + "\n"
			helpcmd += monospace(` × Uso : ${prefix}${cmd.name} ${cmd.use}`) + "\n\n"
			helpcmd += "*Nota :*\n"
			helpcmd += ` ➠ *[ ]* = Opcional\n ➠ *|* = O\n ➠ *<>* = Debe ser llenado`
      msg.reply(helpcmd)
  }
}
