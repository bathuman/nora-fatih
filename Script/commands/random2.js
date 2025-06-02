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
  description: "স্ল্যাশ ছাড়া শুধু 'random' লিখলে র‍্যান্ডম ভিডিও পাঠায়",
  commandCategory: "fun",
  usages: "random",
  cooldowns: 3
};

module.exports.handleEvent = async function({ api, event }) {
  const { body, threadID } = event;

  if (!body || body.trim().toLowerCase() !== "random") return;

  const videoLinks = [
    "https://i.imgur.com/nUe6fif.mp4",
    // চাইলে আরও ভিডিও লিংক যোগ করো
  ];

  const randomLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];

  try {
    const res = await streamFromURL(randomLink);
    api.sendMessage({
      body: "🎬 তোমার র‍্যান্ডম ভিডিও!",
      attachment: res
    }, threadID);
  } catch (e) {
    api.sendMessage("⚠️ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID);
  }
};
