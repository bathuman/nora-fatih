const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "realgirl",
  version: "2.0",
  author: "Siam x ChatGPT",
  description: "Send a real hot girl photo with options!",
  usage: "realgirl [hass|boobs|pgif]",
  cooldown: 5,
  permissions: 0,
  category: "18+"
};

module.exports.run = async function ({ api, event, args }) {
  const cachePath = path.join(__dirname, "cache");
  if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath);

  const type = (args[0] || 'hass').toLowerCase(); // Default is 'hass'

  const supportedTypes = ['hass', 'boobs', 'pgif'];
  if (!supportedTypes.includes(type)) {
    return api.sendMessage(
      `❌ Invalid type!\nAvailable types: ${supportedTypes.join(', ')}`,
      event.threadID,
      event.messageID
    );
  }

  const imgPath = path.join(cachePath, `realgirl_${Date.now()}.jpg`);
  const apiURL = `https://nekobot.xyz/api/image?type=${type}`;

  try {
    const response = await axios.get(apiURL);
    const imageUrl = response.data.message;

    const imgData = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(imgPath, imgData);

    await api.sendMessage({
      body: `🔥 Here's a ${type.toUpperCase()} for you!`,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, event.messageID);

    fs.unlinkSync(imgPath);
  } catch (err) {
    console.error(err);
    api.sendMessage(
      "❌ Couldn't fetch the image right now. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};
