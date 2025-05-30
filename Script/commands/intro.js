module.exports = {
  config: {
    name: "intro",
    version: "1.0",
    author: "Siam x ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Bot introduction",
    longDescription: "Sends 3 intro messages from the bot",
    category: "fun",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    const messages = [
      "👋 হাই, আমি Tamrin Rinty – তোমার ফানি ফেসবুক সাথী!",
      "🤔 তুমি কেমন আছো আজ? আমার সাথে কথা বলো, মজা হবে!",
      "😎 আমার কাছে অনেক ফিচার আছে! শুধু `/menu` লিখে দেখো!"
    ];

    messages.forEach((msg, i) => {
      setTimeout(() => {
        api.sendMessage(msg, event.threadID);
      }, i * 1000); // প্রতি ১ সেকেন্ড পর
    });
  }
};
