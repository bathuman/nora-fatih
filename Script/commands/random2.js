const { get } = require("https");

function streamFromURL(url) {
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      resolve(response);
    }).on("error", reject);
  });
}

module.exports.config = {
  name: "random",
  version: "1.0",
  author: "Siam + ChatGPT",
  description: "র‍্যান্ডম ভিডিও পাঠায়",
  commandCategory: "fun",
  usages: "/random",
  cooldowns: 3
};

module.exports.handleEvent = async function({ api, event }) {
  const { body, threadID } = event;

  if (!body || body.toLowerCase() !== "/random") return;

  const videoLinks = [
    "https://i.imgur.com/nUe6fif.mp4",
    // অন্য ভিডিও লিংক চাইলে এখানে যোগ করো
  ];

  const randomLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];

  try {
    const res = await streamFromURL(randomLink);
    api.sendMessage({
      body: "🎬 নিচে তোমার র‍্যান্ডম ভিডিও!",
      attachment: res
    }, threadID);
  } catch (e) {
    api.sendMessage("⚠️ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID);
  }
};
