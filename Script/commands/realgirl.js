const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "realgirl",
    version: "1.0",
    author: "Siam",
    cooldowns: 5,
    role: 0,
    hasPermission: 0,
    shortDescription: "Sends random real girl image",
    longDescription: "Sends NSFW random image of real girls from nekobot API",
    category: "nsfw",
    guide: "{pn} boobs | hass | pgif"
  },

  onStart: async function ({ api, event, args }) {
    const type = (args[0] || "boobs").toLowerCase();
    const validTypes = ["boobs", "hass", "pgif"];

    if (!validTypes.includes(type)) {
      return api.sendMessage(`❌ Invalid type!\n✅ Try one of: ${validTypes.join(", ")}`, event.threadID, event.messageID);
    }

    const url = `https://nekobot.xyz/api/image?type=${type}`;

    try {
      const res = await axios.get(url);
      const imgUrl = res.data.message;

      const imgPath = path.join(__dirname, "cache", `${Date.now()}.jpg`);
      const imgData = (await axios.get(imgUrl, { responseType: "arraybuffer" })).data;
      fs.outputFileSync(imgPath, imgData);

      await api.sendMessage({
        body: `Here's a realgirl (${type.toUpperCase()}) for you 😍`,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);

    } catch (err) {
      console.error("realgirl.js error:", err);
      api.sendMessage("❌ Failed to get image. Try again later.", event.threadID, event.messageID);
    }
  }
};
