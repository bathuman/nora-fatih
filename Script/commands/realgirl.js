const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "realgirl",
    version: "1.0",
    author: "Siam",
    countDown: 5,
    role: 0,
    shortDescription: "Send real boobs image",
    longDescription: "Send real girl boobs image",
    category: "18+",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const imgURL = "https://nekobot.xyz/api/image?type=boobs";

    try {
      const res = await axios.get(imgURL);
      const imageUrl = res.data.message;

      const imgPath = path.join(__dirname, "cache", `${Date.now()}.jpg`);
      const imageData = (await axios.get(imageUrl, { responseType: "arraybuffer" })).data;
      fs.outputFileSync(imgPath, imageData);

      await api.sendMessage({
        body: "Here's a random real girl photo ❤️",
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);

    } catch (err) {
      console.error("Realgirl Error:", err.message);
      api.sendMessage("❌ Error fetching image.", event.threadID, event.messageID);
    }
  }
};
