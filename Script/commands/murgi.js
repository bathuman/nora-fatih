module.exports.config = {
  name: "murgi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Siam",
  description: "একাধিক মেসেজ ৩ সেকেন্ড ইন্টারভালে পাঠায়",
  commandCategory: "utility",
  usages: "/murgi",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  // প্রথম মেসেজ
  api.sendMessage("👋 হ্যালো!", event.threadID, () => {
    // ৩ সেকেন্ড পর দ্বিতীয় মেসেজ
    setTimeout(() => {
      api.sendMessage("আমি Tamrin Rinty বট 🤖", event.threadID, () => {
        // আবার ৩ সেকেন্ড পর তৃতীয় মেসেজ
        setTimeout(() => {
          api.sendMessage("আপনার জন্য কী করতে পারি? 😊", event.threadID);
        }, 3000);
      });
    }, 3000);
  });
};
