import os from 'os'

let handler = async (m, { conn }) => {
  // Tiempo activo del bot
  let uptime = process.uptime() * 1000
  let segundos = Math.floor(uptime / 1000) % 60
  let minutos = Math.floor(uptime / (1000 * 60)) % 60
  let horas = Math.floor(uptime / (1000 * 60 * 60)) % 24
  let dias = Math.floor(uptime / (1000 * 60 * 60 * 24))
  let tiempoActivo = `${dias}d ${horas}h ${minutos}m ${segundos}s`

  // País (bandera personalizada por usuario)
  let flag = global.db.data.users[m.sender]?.flag || "🇲🇽"

  // Usuarios registrados
  let totalUsuarios = Object.keys(global.db.data.users).length

  // Fecha actual
  let fecha = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  // Nombre del usuario
  let userName = conn.getName(m.sender)

  // Contacto estilo tarjeta
  global.fkontak = {
    key: {
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: `𝐋𝐄𝐆𝐒 𝐁𝐎𝐓 𝐕3`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;SAIKI BOT;;;\nFN:SAIKI BOT\nitem1.TEL;waid=1234567890:1234567890\nitem1.X-ABLabel:Bot\nEND:VCARD`
      }
    }
  }

  // Imagen del menú (puedes cambiar el link por el que quieras)
  let img = 'https://files.catbox.moe/stx0s4.jpg'

  let menu = `
𝐇𝐎𝐋𝐀 ${userName} 🔥
𝐌𝐄 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐎 𝐒𝐎𝐘
𝐋𝐄𝐆𝐒 𝐁𝐎𝐓 𝐕3 𝐁𝐘 𝐀𝐋𝐄𝐗𝐈𝐒

╭┈┈┈┈┈⊰
┊ ⛓️‍💥 𝙰𝙲𝚃𝙸𝚅𝙰: ${tiempoActivo}
┊ ⛓️‍💥 𝙿𝙰𝙸𝚂: ${flag}
┊ ⛓️‍💥 𝙵𝙴𝙲𝙷𝙰: ${fecha}
┊ ⛓️‍💥 𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂: ${totalUsuarios}
┊ ⛓️‍💥 𝙼𝙾𝙳𝙾: 𝙿𝚁𝙸𝚅𝙰𝙳𝙾
╰┈┈┈┈┈┈┈┈┈⊰


L I S T A  -  M E N Ú

╭┈┈⊰  🌯 Ａ D M I N S 🌯
┊🤖 .groupdesc
┊🤖 .groupimg
┊🤖 .groupname
┊🤖 .admins texto
┊🤖 .bienvenidos
┊🤖 .creargrupo + nombre
┊🤖 .listonline
┊🤖 .darpija
┊🤖 .sorteo
┊🤖 .boletos
┊🤖 .seguidores 
┊🤖 .libros
┊🤖 .metodo
┊🤖 .pago
┊🤖 .peliculas
┊🤖 .combos
┊🤖 .setcombos txt
┊🤖 .setpago txt
┊🤖 .setpeliculas txt
┊🤖 .setstock txt
┊🤖 .setseguidores txt
┊🤖 .stock
┊🤖 .enable option
┊🤖 .disable option
┊🤖 .donarsala
┊🤖 .banearbot
┊🤖 .group open / close
┊🤖 .grupo abrir / cerrar
┊🤖 .del
┊🤖 .fantasmas
┊🤖 .infogrupo
┊🤖 .guía
┊🤖 .invitar + numero
┊🤖 .kick @user
┊🤖 .link
┊🤖 .mute
┊🤖 .unmute
┊🤖 .daradmin @usuario
┊🤖 .reglas
┊🤖 .setreglas + Texto
┊🤖 .emotag + emoji
┊🤖 .setwelcome @user + texto
┊🤖 .desbanearbot
┊🤖 .quitaradmin @usuario
┊🤖 .setbye @user + texto
┊🤖 .notify
┊🤖 .kickall
┊🤖 .todos
┊🤖 .horario
┊🤖 .linea
┊🤖 .manual
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🍮 ＣＲＥＡＤＯＲ 🍮
┊🤖 .listadegrupo
┊🤖 .grouplist
┊🤖 .enable option
┊🤖 .disable option
┊🤖 .runtime
┊🤖 .totalfunciones
┊🤖 .ping
┊🤖 .ban @user
┊🤖 .ds
┊🤖 .join link
┊🤖 .reportar
┊🤖 .reiniciar
┊🤖 .salir
┊🤖 .unban @user
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🎧 ＭＵＳＩＣＡ 🎧
┊🤖 .play texto
┊🤖 .play2 texto
┊🤖 .play3 texto
┊🤖 .soundcloud texto
┊🤖 .spoti
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🥞 ＬＯＧＯＳ 🥞
┊🤖 .logocorazon
┊🤖 .logochristmas
┊🤖 .logopareja
┊🤖 .logoglitch
┊🤖 .logosad
┊🤖 .logogaming
┊🤖 .logosolitario
┊🤖 .logodragonball
┊🤖 .logoneon
┊🤖 .logogatito
┊🤖 .logochicagamer
┊🤖 .logonaruto
┊🤖 .logofuturista
┊🤖 .logonube
┊🤖 .logoangel
┊🤖 .logomurcielago
┊🤖 .logocielo
┊🤖 .logograffiti3d
┊🤖 .logomatrix
┊🤖 .logohorror
┊🤖 .logoalas
┊🤖 .logoarmy
┊🤖 .logopubg
┊🤖 .logopubgfem
┊🤖 .logolol
┊🤖 .logoamongus
┊🤖 .logovideopubg
┊🤖 .logovideotiger
┊🤖 .logovideointro
┊🤖 .logovideogaming
┊🤖 .logoguerrero
┊🤖 .logoportadaplayer
┊🤖 .logoportadaff
┊🤖 .logoportadapubg
┊🤖 .logoportadacounter
┊🤖 .sadcat texto
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🍙 ＤＩＶＥＲＳＩＯＮ 🍙
┊🤖 .meme
┊🤖 .abrazar @usuario
┊🤖 .acariciar @tag
┊🤖 .acertijo
┊🤖 .advpeli
┊🤖 .gay @tag | nombre
┊🤖 .lesbiana @tag | nombre
┊🤖 .pajero @tag | nombre
┊🤖 .peruano @tag | nombre
┊🤖 .peruana @tag | nombre
┊🤖 .pajera @tag | nombre
┊🤖 .puto @tag | nombre
┊🤖 .puta @tag | nombre
┊🤖 .manco @tag | nombre
┊🤖 .manca @tag | nombre
┊🤖 .rata @tag | nombre
┊🤖 .prostituta @tag | nombre
┊🤖 .prostituto @tag | nombre
┊🤖 .consejo
┊🤖 .dance @user
┊🤖 .doxear @tag
┊🤖 .follar
┊🤖 .formarpareja
┊🤖 .gay2
┊🤖 .horny
┊🤖 .iqtest
┊🤖 .besar @tag
┊🤖 .love @user
┊🤖 .enamorada @tag
┊🤖 .meme
┊🤖 .lov2 @tag | nombre
┊🤖 .cachuda @tag | nombre
┊🤖 .negra @tag | nombre
┊🤖 .adoptado @tag | nombre
┊🤖 .sintetas @tag | nombre
┊🤖 .sinpoto @tag | nombre
┊🤖 .sinpito @tag | nombre
┊🤖 .feo @tag | nombre
┊🤖 .cachudo @tag | nombre
┊🤖 .fea @tag | nombre
┊🤖 .negro @tag | nombre
┊🤖 .adoptada @tag | nombre
┊🤖 .personalidad nombre
┊🤖 .ppt
┊🤖 .pregunta
┊🤖 .pucheros @tag
┊🤖 .reirse @tag
┊🤖 .reto
┊🤖 .triste @tag
┊🤖 .ship
┊🤖 .sonrojarse @tag
┊🤖 .top texto
┊🤖 .turno
┊🤖 .violar
┊🤖 .zodiac AAAA MM DD
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🔫 ＦＲＥＥ ＦＩＲＥ 🔫
┊🤖 .ffstalk id del jugador
┊🤖 .tiktokstalk usuario
┊🤖 .12vs12
┊🤖 .16vs16
┊🤖 .20vs20
┊🤖 .24vs24
┊🤖 .6vs6
┊🤖 .8vs8
┊🤖 .interna
┊🤖 .guerra
┊🤖 .reglaslideres
┊🤖 .reglaslideres2
┊🤖 .scrim
┊🤖 .4vs4 Reg|Hr|Bnd|Mod
┊🤖 .alpes
┊🤖 .bermuda
┊🤖 .kalahari
┊🤖 .nexterra
┊🤖 .purgatorio
┊🤖 .cuadrilatero
┊🤖 .hexagonal
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🍄 ＳＴＩＣＫＥＲＳ 🍄
┊🤖 .img reply
┊🤖 .quotly texto
┊🤖 .scat
┊🤖 .smeme texto
┊🤖 .sticker
┊🤖 .wm nombre|autor
┊🤖 .fake texto/@tag/texto
┊🤖 .hd
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🔞 ＮＳＦＷ 🔞
┊🤖 .booty
┊🤖 .ecchi
┊🤖 .furro
┊🤖 .lesbianas
┊🤖 .nsfwloli
┊🤖 .panties
┊🤖 .pene
┊🤖 .porno
┊🤖 .rule34 búsqueda
┊🤖 .pechos
┊🤖 .tetas
┊🤖 .trapito
┊🤖 .xnxxdl url
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🎮 ＪＵＥＧＯＳ 🎮
┊🤖 .apostar cantidad
┊🤖 .slot apuesta
┊🤖 .claim
┊🤖 .crimen
┊🤖 .dardulces @user cantidad
┊🤖 .dulces
┊🤖 .minar
┊🤖 .work
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  🧾 ＲＥＧＩＳＴＲＯＳ 🧾
┊🤖 .perfil @user
┊🤖 .sn
┊🤖 .reg nombre.edad
┊🤖 .mysn2
┊🤖 .unreg ° serial
╰┈┈┈┈┈┈┈┈┈⊰

╭┈┈⊰  main
┊🤖 .menu
┊🤖 .owner
╰┈┈┈┈┈┈┈┈┈⊰
`

  await conn.sendMessage(m.chat, { image: { url: img }, caption: menu }, { quoted: global.fkontak })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu']

export default handler
