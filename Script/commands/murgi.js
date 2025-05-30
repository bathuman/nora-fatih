module.exports.config = {
  name: "murgi",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Siam",
  description: "Mentions the replied or mentioned user in each message",
  commandCategory: "utility",
  usages: "/murgi [@user] or reply to a user with /murgi",
  cooldowns: 5,
};

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async function ({ api, event }) {
  let mentionID = null;
  let mentionName = null;

  // Check if the message is a reply
  if (event.type === "message_reply") {
    mentionID = event.messageReply.senderID;
    try {
      const userInfo = await api.getUserInfo(mentionID);
      mentionName = userInfo[mentionID].name;
    } catch (e) {
      console.error("Error fetching user info:", e);
      return api.sendMessage("Unable to retrieve user information.", event.threadID);
    }
  }

  // If not a reply, check for mentions
  else if (event.mentions && Object.keys(event.mentions).length > 0) {
    mentionID = Object.keys(event.mentions)[0]; // First mentioned user
    mentionName = event.mentions[mentionID];
  }

  const messages = [
    "👋 হ্যালো!",
    "আমি Tamrin Rinty বট 🤖",
    "আপনার জন্য কী করতে পারি? 😊",
    "আপনি কেমন আছেন?",
    "আমি সবসময় অনলাইন থাকি 😎",
    "আমার অনেক ফিচার আছে!",
    "আপনি /help লিখে দেখতে পারেন",
    "আমি ভিডিও নামাতে পারি 🎥",
    "Facebook, YouTube, TikTok থেকে!",
    "আপনার যদি গান দরকার হয় 🎶",
    "তাও আমি দিতে পারি!",
    "আপনি আমাকে ব্যবহার করে মজা নিতে পারেন 😄",
    "চ্যাটবট হিসেবে আমি খুবই বন্ধু-সুলভ 🤝",
    "আপনি কোন জেলা থেকে?",
    "বাংলাদেশ আমার প্রিয় দেশ 🇧🇩",
    "আপনার নাম কী?",
    "আপনার জন্য আমি অনেক কিছু করতে পারি!",
    "আপনি চাইলে স্টিকারও বানাতে পারি!",
    "আপনি চাইলে মিম বানাতে পারি 😆",
    "আপনি চাইলে শায়েরি শুনাতে পারি 📝",
    "আপনি চাইলে আমার সাথে খেলা খেলতে পারেন 🎮",
    "আমি কখনো ক্লান্ত হই না!",
    "রাত হোক কিংবা দিন, আমি আছি!",
    "আপনি চাইলে রিমাইন্ডার সেট করতে পারেন ⏰",
    "আপনি চাইলে নিউজ দেখতে পারেন 📰",
    "আমি AI, মানে কৃত্রিম বুদ্ধিমত্তা 🤖",
    "আপনি আমার ডেভেলপার Siam কে ধন্যবাদ জানাতে পারেন",
    "তার কারণেই আমি তৈরি 😍",
    "তোমার কথায় আমি আনন্দ পাই 💬",
    "তোমার বন্ধু Tamrin Rinty সবসময় পাশে আছে!",
    "ধন্যবাদ আমাকে এক্টিভ করার জন্য ❤️"
  ];

  for (const msg of messages) {
    if (mentionID && mentionName) {
      api.sendMessage({
        body: `@${mentionName} ${msg}`,
        mentions: [{
          tag: `@${mentionName}`,
          id: mentionID
        }]
      }, event.threadID);
    } else {
      api.sendMessage(msg, event.threadID);
    }
    await wait(1000); // 1-second interval between messages
  }
};
