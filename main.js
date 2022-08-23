require("./global")
const fs = require("fs");
const path = require("path");
const { Boom } = require("@hapi/boom");
const log = (pino = require("pino"));
const cron = require("node-cron");
const moment = require("moment");
const chalk = require('chalk')
const figlet = require('figlet')
const { color } = require("./lib/function")
const utils = require("./lib/utils");

const {
	fetchLatestBaileysVersion,
	makeInMemoryStore,
	default: Baileys,
	useSingleFileAuthState,
	jidDecode,
	DisconnectReason,
	delay,
} = require("@adiwajshing/baileys");

try {
var { state, saveState } = useSingleFileAuthState(path.join(__dirname, `./lib/database/${config.session ? config.session : "session"}.json`), log({ level: "silent" }));
} catch {
fs.unlinkSync(`./lib/database/${config.session ? config.session : "session"}.json`)
var { state, saveState } = useSingleFileAuthState(`./lib/database/${config.session ? config.session : "session"}.json`);
}


moment.locale("id");
const attr = {};
attr.prefix = ".";
attr.uptime = new Date();
attr.command = new Map();
attr.isSelf = config.self


// Store
global.store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const ReadFitur = () => {
	let pathdir = path.join(__dirname, "./command");
	let fitur = fs.readdirSync(pathdir);
	console.log(chalk.green('Espere, Cargando comandos..'))
	fitur.forEach(async (res) => {
		const commands = fs.readdirSync(`${pathdir}/${res}`).filter((file) => file.endsWith(".js"));
		for (let file of commands) {
			const command = require(`${pathdir}/${res}/${file}`);
			if (typeof command.run != "function") continue;
			const cmdOptions = {
				name: "command",
				alias: [""],
				desc: "",
				use: "",
				type: "", // default: changelog
				category: typeof command.category == "undefined" ? "No Category" : res.toLowerCase(),
				wait: false,
				isOwner: false,
				isAdmin: false,
				isQuoted: false,
				isGroup: false,
				isBotAdmin: false,
				query: false,
				isPrivate: false,
				noPrefix: false,
				isMedia: {
					isQVideo: false,
					isQAudio: false,
					isQImage: false,
					isQSticker: false,
					isQDocument: false,
				},
				disable: false,
				isUrl: false,
				run: () => {},
			};
			let cmd = utils.parseOptions(cmdOptions, command);
			let options = {};
			for (var k in cmd)
				typeof cmd[k] == "boolean"
					? (options[k] = cmd[k])
					: k == "query" || k == "isMedia"
					? (options[k] = cmd[k])
					: "";
			let cmdObject = {
				name: cmd.name,
				alias: cmd.alias,
				desc: cmd.desc,
				use: cmd.use,
				type: cmd.type,
				category: cmd.category,
				options: options,
				run: cmd.run,
			};
			attr.command.set(cmd.name, cmdObject);
			require("delay")(100);
			global.reloadFile(`./command/${res}/${file}`);
		}
	});
	console.log(chalk.yellow('Comandos cargado con éxito✓'))
};
// cmd
ReadFitur();


const connect = async() => {
  start()
}

async function start(){
  let { version, isLatest } = await fetchLatestBaileysVersion();
  
  let data = fs.readFileSync(path.join(__dirname, "doom.flf"), "utf8");
  console.clear();
  console.log(color('------------------------------------------------------------------------', 'white'))
  console.log(color(figlet.textSync('Simple', { font: 'doom', horizontalLayout: 'default' }, data)))
  console.log(color('------------------------------------------------------------------------', 'white'))
  console.log(color('[Creador]', 'aqua'), color(config.author, 'magenta'))
  console.log(color('[BOT]', 'aqua'), color('BOT Online!', 'magenta'))
  console.log(color('[VER]', 'aqua'), color(`${version}`, 'magenta'))
    
  const conn = Baileys({
    printQRInTerminal: true,
		auth: state,
		browser: [config.namebot, "Safari", "1.0.0"],
		logger: log({ level: "silent" }),
		version,
  })
  
  const decodeJid = (jid) => {
		if (/:\d+@/gi.test(jid)) {
			const decode = jidDecode(jid) || {};
			return ((decode.user && decode.server && decode.user + "@" + decode.server) || jid).trim();
		} else return jid.trim();
	};
	
	store.bind(conn.ev);
	
	conn.ev.on("creds.update", saveState);
	conn.ev.on("connection.update", async (ktl) => {
	  const { lastDisconnect, connection } = ktl;
	  if (connection == "connecting") console.log(chalk.cyan('Conexión al bot de WhatsApp...'))
	  if (connection) {
	    if (connection != "connecting") 
	      console.log(chalk.yellow("Connection: " + connection))
	  }
	  if (connection == "open") {
	    console.log(chalk.yellow("Conectado exitosamente a whatsapp"))
	    conn.sendMessage(config.owner[0],{text: "*_😝Conectado exitosamente!*_"})
	  }
	  if (connection === "close") {
			let reason = new Boom(lastDisconnect.error).output.statusCode;
			if (reason === DisconnectReason.badSession) {
				console.log(chalk.red(`Archivo de sesión incorrecto, elimine la sesión y vuelva a escanear`));
				conn.logout();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log(chalk.red("Conexión cerrada, reconectando...."));
				start();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log(chalk.red("Conexión perdida del servidor, reconectando..."));
				start();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log(chalk.red("Conexión reemplazada, otra nueva sesión abierta, cierre la sesión actual primero"));
				conn.logout();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(chalk.red(`Dispositivo cerrado, por favor elimine la sesión y vuelva a escanear.`));
				conn.logout();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log(chalk.yellow("Reinicio requerido, reiniciar..."));
				start();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Se agotó el tiempo de conexión, reconectando...");
				start();
			} else {
				conn.end(`Motivo de desconexión desconocido: ${reason}|${lastDisconnect.error}`);
			}
		}
	})
	
	conn.ev.on("call", async (senku) => {
	  console.log(senku)
	  for(let sen of senku){
	    if(sen.isGroup == false){
	      if(sen.status == "offer"){
	        teks = `*${conn.user.name}* no puedo recibir llamadas ${sen.isVideo ? `video` : `suara`}. ¡Lo siento, serás bloqueado! Si por accidente, póngase en contacto con el propietario.!\n\nNúmero de propietario :\n${config.owner.map((a) => `${a.split(`@`)[0]} | ${conn.getName(a).includes("+593") ? "Sin detección" : conn.getName(a)
							}`).join("\n")}`
				  conn.sendMessage(sen.from, {text : teks})
					await require("delay")(5000);
					await conn.updateBlockStatus(sen.from, "block")
	      }
	    }
	  }
	})
	
	
	//contact update
	conn.ev.on("contacts.update", (m) => {
		for (let kontak of m) {
			let jid = decodeJid(kontak.id);
			if (store && store.contacts) store.contacts[jid] = { jid, name: kontak.notify };
		}
	});
	
	// Welcome 
	conn.ev.on("group-participants.update", async (msg) => {
		require("./lib/function/groupUpdate").welcome(conn, msg);
		require("./lib/function/groupUpdate").left(conn, msg);
		require("./lib/function/groupUpdate").antiluar(conn, msg);
	});
	
	conn.ev.on("messages.upsert", async (mek) => {
	  const msg = mek.messages[0];
	  const type = msg.message ? Object.keys(msg.message)[0] : "";
	  if(msg && type == "protocolMessage") conn.ev.emit("message.delete", msg.message.protocolMessage.key);
	  require('./handler')(mek, conn, attr)
	})
}

connect();
