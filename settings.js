import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
// ZONA DE JIDS
["50493732693", "Ado </>", true],
[""],
[""],  
// ZONA DE LIDS 
["", "", true],
["", "", true], 
["", "", true]
]

global.mods = []
global.suittag = ["50493732693"] 
global.prems = []


global.libreria = "Baileys Multi Device"
global.vs = "^1.3.2"
global.nameqr = "Legs"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = true
global.enableRcanal = true

global.botname = "𝐋𝐄𝐆𝐒 - 𝐁𝐎𝐓"
global.textbot = "𝐋𝐄𝐆𝐒 ᴠ3, 𝗔𝗟𝗘𝗫"
global.dev = "✎𝗕𝘆 𝗔𝗟𝗘𝗫𝗜𝗦"
global.author = "𝗛𝗘𝗖𝗛𝗢 𝗣𝗢𝗥 𝗧𝗜𝗟𝗜𝗡"
global.etiqueta = "𝗔𝗟𝗘𝗫𝗜𝗦 | 𝟤𝟢𝟤𝟧 ©"
global.currency = "¢ 𝗟𝗘𝗚𝗦"
global.michipg = "https://files.catbox.moe/stx0s4.jpg"
global.icono = "https://files.catbox.moe/stx0s4.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')


global.group = "https://chat.whatsapp.com/BHaeKGeSzn4ILtpIkeKh2c"
global.community = ""
global.channel = "https://whatsapp.com/channel/0029VauK3kA4SpkPQyez1z00"
global.github = "https://github.com"
global.gmail = "minexdt@gmail.com"
global.ch = {
ch1: "120363357544459855@newsletter"
}


global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: null }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})
