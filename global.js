const fs = require('fs');
const { color } = require("./lib/function");

global.shp = " ×"
global.config = require("./lib/config.json");
global.sc = require('./lib/scrape');
global.tool = require('./lib/tools');
global.footer = "*_乂 Simple WhatsApp - Bot_*"
const IkyyClient = require("ikyy");
global.rzky = new IkyyClient();
const Database = require('./lib/Database')
global.db = new Database()
global.conns = []

global.printLog = async(isCmd, sender, msg, body, groupName, isGc) => {
	if(isCmd && isGc) {
		return console.log(color("[ COMMAND GC ]", "aqua"),color(sender.split("@")[0], "lime"),color(body, "aqua"),"in",color(groupName, "lime"));
	}
	if(isCmd && !isGc) {
		return console.log(color("[ COMMAND PC ]", "aqua"), color(sender.split("@")[0], "lime"), color(body, "aqua"));
	}
}

global.reloadFile = (file, options = {}) => {
    nocache(file, module => {
    console.log(`El archivo "${file}" se ha actualizado!\nReiniciar!`)
    process.send("reset")
    })
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
