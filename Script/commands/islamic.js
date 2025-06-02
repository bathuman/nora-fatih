module.exports.config = {
  name: "islamick",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "RANDOM islamic video",
  commandCategory: "Random video",
  usages: "Statusvideo",
  cooldowns: 2,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async({ api, event }) => {
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  var link = [
    "https://i.imgur.com/nUe6fif.mp4"
  ];

  var callback = () => api.sendMessage({
    body: `╭──────•◈•───────╮\n\n🌻মানুষ হারাম ছাড়েনা অথচ সুখ শান্তি খুঁজে বেড়ায় আরাম\nমানুষ কেন বুঝতে চায় না\n সে যে খোদার গোলাম🥺। \n\nআল্লাহ আমাদের সবাইকে হারাম থেকে দূরে থাকার তৌফিক দান করুক 😭❤️‍🩹।\n\n𝗠𝗔𝗗𝗘 𝗕𝗬: 𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁\n╰──────•◈•───────╯`,
    attachment: fs.createReadStream(__dirname + "/cache/1.mp4")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));

  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/1.mp4"))
    .on("close", () => callback());
};
