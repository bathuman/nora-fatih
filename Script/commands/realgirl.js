
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "realgirl",
    version: "1.0",
    author: "Siam + ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Send random real girl image",
    longDescription: "Send random NSFW image (boobs, hass, pgif)",
    category: "18+",
    guide: "{pn} boobs | hass | pgif"
  },

  onStart: async function ({ api, event, args }) {
    const type = (args[0] || "boobs").toLowerCase();
    const allowed = ["boobs", "hass", "pgif"];

    if (!allowed.includes(type)) {
      return api.sendMessage(
        `❌ Invalid type!\n\n✅ Valid options: ${allowed.join(", ")}`,
        event.threadID,
        event.messageID
      );
    }

    try {
      const res = await axios.get(`https://nekobot.xyz/api/image?type=${type}`);
      const imageUrl = res.data.message;

      const filePath = path.join(__dirname, "cache", `${Date.now()}.jpg`);
      const imageData = (await axios.get(imageUrl, { responseType: "arraybuffer" })).data;
      fs.outputFileSync(filePath, imageData);

      await api.sendMessage(
        {
          body: `Here's a ${type.toUpperCase()} for you 🔥`,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    } catch (err) {
      console.log("🔴 Error in realgirl.js:", err.message);
      api.sendMessage("❌ Couldn't fetch image. Try again later.", event.threadID, event.messageID);
    }
  }
};
