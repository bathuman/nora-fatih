const axios = require('axios');
const fs = require("fs");
const path = require("path");
const request = require('request');

module.exports.config = {
  name: "rushia",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Random Rushia image",
  commandCategory: "random-img",
  usages: "rushia",
  cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
  try {
    const res = await axios.get('https://saikiapi-v3-production.up.railway.app/holo/rushia');
    const imageUrl = res.data.url;
    const ext = path.extname(imageUrl);
    const filePath = path.join(__dirname, `/cache/rushia${ext}`);

    const callback = () => {
      api.sendMessage({
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    };

    request(imageUrl).pipe(fs.createWriteStream(filePath)).on("close", callback);
  } catch (error) {
    api.sendMessage("❌ There was a problem generating the image, please try again later.", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, () => {}, true);
  }
};
