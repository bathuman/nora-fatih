const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "realgirl",
  version: "1.0",
  author: "Siam x ChatGPT",
  description: "Send a hot girl photo (boobs, hass, pgif)",
  usage: "realgirl [boobs|hass|pgif]",
  cooldown: 5,
  permissions: 0,
  category: "18+"
};

module.exports.run = async function ({ api, event, args }) {
  const type = (args[0] || 'boobs').toLowerCase();
  const validTypes = ['boobs', 'hass', 'pgif'];

  if (!validTypes.includes(type)) {
    return api.sendMessage(
      `❌ Invalid type!\nTry: ${validTypes.join(", ")}`,
      event.threadID,
      event.messageID
    );
  }

  const folderPath = __dirname + "/cache/";
  const filePath = folderPath + `realgirl_${Date.now()}.jpg`;

  try {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    const res = await axios.get(`https://nekobot.xyz/api/image?type=${type}`);
    const imageUrl = res.data.message;

    const imgBuffer = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(filePath, imgBuffer);

    api.sendMessage({
      body: `Here's a ${type.toUpperCase()} 🔥`,
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

  } catch (error) {
    console.error("realgirl error:", error);
    return api.sendMessage("❌ Couldn't fetch the image. Try again later.", event.threadID, event.messageID);
  }
};
