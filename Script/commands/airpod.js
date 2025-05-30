const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "airpod",
    aliases: [],
    version: "1.0",
    author: "Siam 💖",
    countDown: 10,
    role: 0,
    shortDescription: "AI ছবি তৈরি",
    longDescription: "OpenAI API ব্যবহার করে ছবি তৈরি করে",
    category: "ai",
    guide: "{pn} <prompt>"
  },

  onStart: async function ({ message, event, args }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("📸 Prompt dao! Example: /photo a cat in ghibli style");

    try {
      const res = await axios.post("https://api.openai.com/v1/images/generations", {
        prompt: prompt,
        n: 1,
        size: "512x512"
      }, {
        headers: {
          "Authorization": `Bearer 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`
        }
      });

      const imageUrl = res.data.data[0].url;
      const path = __dirname + `/cache/ai_${event.senderID}.png`;

      const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imgRes.data, "binary"));

      message.reply({ attachment: fs.createReadStream(path) }, () => fs.unlinkSync(path));
    } catch (error) {
      console.error(error);
      message.reply("❌ Sorry baby, image generate korte parlam na.");
    }
  }
};
