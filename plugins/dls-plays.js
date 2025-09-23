import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) {
    return conn.reply(m.chat, `❀ Envía el nombre o link del vídeo para descargar.`, m);
  }

  await m.react("🕒");

  try {
    const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/);
    const query = videoMatch ? `https://youtu.be/${videoMatch[1]}` : text;

    const search = await yts(query);
    const result = videoMatch ? search.videos.find((v) => v.videoId === videoMatch[1]) || search.all[0] : search.all[0];
    if (!result) throw "ꕥ No se encontraron resultados.";

    const { title, seconds, views, url, thumbnail, author } = result;
    if (seconds > 2400) throw "❐ Lo sentimos, este video excede la duración máxima de 40 minutos.";

    const vistas = formatViews(views);
    const duracion = formatDuration(seconds);
    const canal = author?.name || "Desconocido";
    const info = `「✦」Descargando *<${title}>*

> ✐ Canal » *${canal}*
> ⴵ Duración » *${duracion}*
> ✰ Calidad: *${["play", "yta", "ytmp3", "playaudio"].includes(command) ? "128k" : "360p"}*
> 🜸 Link » ${url}
> ⟡ Vistas » *${vistas}*`;

    // Send thumbnail and info concurrently with media fetching
    const sendThumbnail = conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: info }, { quoted: m });

    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      const audioUrl = await getYtmp3(url);
      if (!audioUrl) throw "⚠ No se pudo obtener el audio.";

      await Promise.all([
        sendThumbnail,
        conn.sendMessage(m.chat, { audio: { url: audioUrl }, fileName: `${title}.mp3`, mimetype: "audio/mpeg", ptt: true }, { quoted: m }),
      ]);

    } else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      const video = await getYtmp4(url);
      if (!video?.data) throw "⚠ No se pudo obtener el video.";

      await Promise.all([
        sendThumbnail,
        conn.sendMessage(m.chat, { video: video.data, fileName: `${title}.mp4`, mimetype: "video/mp4", caption: "> » Video descargado correctamente." }, { quoted: m }),
      ]);
    }

    await m.react("✔️");
  } catch (e) {
    await m.react("✖️");
    return conn.reply(m.chat, typeof e === "string" ? e : "⚠ Se produjo un error.\n" + e.message, m);
  }
};

handler.command = handler.help = ["play", "ytmp3", "play2", "ytmp4", "mp4", "mp3"];
handler.tags = ["descargas"];
handler.group = true;

export default handler;

async function getYtmp3(url) {
  try {
    const endpoint = `http://173.208.192.170/download/ytmp3?apikey=Adofreekey&url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, { redirect: "follow" }).then((r) => r.json());
    return res?.data?.url || null;
  } catch {
    return null;
  }
}

async function getYtmp4(url) {
  try {
    const endpoint = `https://api-adonix.ultraplus.click/download/ytmp4?apikey=Adofreekey&url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint).then((r) => r.json());
    if (!res?.data?.url) return null;

    const finalUrl = await getFinalUrl(res.data.url);
    const videoBuffer = await fetch(finalUrl).then((r) => r.arrayBuffer());
    return { data: Buffer.from(videoBuffer), url: finalUrl };
  } catch {
    return null;
  }
}

async function getFinalUrl(url) {
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  return res.url || url;
}

function formatViews(views) {
  if (views === undefined) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)} B (${views.toLocaleString()})`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)} M (${views.toLocaleString()})`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)} K (${views.toLocaleString()})`;
  return views.toString();
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min} minutos ${sec} segundos`;
}
