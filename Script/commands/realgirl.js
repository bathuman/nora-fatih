const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "realgirl",
  version: "1.0",
  author: "Siam x ChatGPT",
  description: "Send a real girl image based on category",
  usage: "realgirl [hass|boobs|pgif]",
  cooldown: 5,
  permissions: 0,
  credits: "Siam",
  category: "18+"
};

module.exports.run = async function ({ api, event, args }) {
  const type = (args[0] || 'hass').toLowerCase();
  const allowed = ['hass', 'boobs', 'pgif'];

  if (!allowed.includes(type)) {
    return api.sendMessage(`❌ Invalid type!\n\nValid options: ${allowed.join(', ')}`, event.threadID, event.messageID);
  }

  const apiUrl = `https://nekobot.xyz/api/image?type=${type}`;
  const cacheDir = path.join(__dirname, 'cache');
  const imgPath = path.join(cacheDir, `realgirl_${Date.now()}.jpg`);

  try {
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const res = await axios.get(apiUrl);
    const imgUrl = res.data.message;

    const imgData = (await axios.get(imgUrl, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(imgPath, imgData);

    await api.sendMessage({
      body: `🔥 Here's a ${type.toUpperCase()} for you.`,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);

  } catch (error) {
    console.log(error);
    return api.sendMessage("❌ Failed to fetch image. Please try again later.", event.threadID, event.messageID);
  }
};
