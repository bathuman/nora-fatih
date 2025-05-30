module.exports.config = {
  name: "hi",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Siam",
  description: "Reply বা Mention দিলে ইউজারকে ট্যাগ করে ১ সেকেন্ড ইন্টারভালে ৩০+ মেসেজ দেয়",
  commandCategory: "utility",
  usages: "/murgi @user বা রিপ্লাই দিয়ে /murgi",
  cooldowns: 5,
};

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async function ({ api, event }) {
  let mentionID = null;
  let mentionName = null;

  // ✅ যদি রিপ্লাই করা হয় কাউকে
  if (event.type === "message_reply") {
    mentionID = event.messageReply.senderID;
    try {
      const userInfo = await api.getUserInfo(mentionID);
      mentionName = userInfo[mentionID].name;
    } catch (e) {
      console.log("ইউজারের নাম আনতে সমস্যা হয়েছে:", e);
      return api.sendMessage("ইউজারের নাম পাওয়া যায়নি।", event.threadID);
    }
  }

  // ✅ রিপ্লাই না থাকলে, দেখা হবে @mention আছে কিনা
  else if (event.mentions && Object.keys(event.mentions).length > 0) {
    mentionID = Object.keys(event.mentions)[0]; // প্রথম mention
    mentionName = event.mentions[mentionID];
  }

  // ✅ এখানে সব মেসেজের লিস্ট
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

  // ✅ মেসেজ পাঠানো শুরু (১ সেকেন্ড পরপর)
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
    await wait(1000); // ১ সেকেন্ড বিরতি
  }
};
