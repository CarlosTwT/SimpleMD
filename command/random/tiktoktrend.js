const { monospace, random } = require("../../lib/function")
const { tiktoktrend } = require("../../lib/scrape");


module.exports = {
  name: "tiktoktrend",
  alias: ["tttrend","tiktoktrend"],
  category: "random",
  desc: "Desconocido",
  wait: true,
  async run({msg,conn},{map, cmdNya}){
    try {
      var trend = await tiktoktrend();
      result = await random(trend.result)
      txt = "*乂 Tiktok - Trend*\n\n"
      txt += monospace(` • Username : ${result.username}`) + "\n"
      txt += monospace(` • Hace : ${result.upload_time}`) + "\n"
      txt += monospace(` • Views : ${result.views}`) + "\n"
      txt += monospace(` • Like : ${result.like}`) + "\n"
      txt += monospace(` • Comentarios : ${result.comment}`) + "\n"
      txt += monospace(` • Compartidas : ${result.share}`) + "\n"
      txt += monospace(` • Subtítulo : ${result.caption}`)
      conn.sendFile(msg.from, result.video, "tt.mp4",txt,msg)
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
