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
    "ayanokoji রে যে গালি দিবি তার আম্মু রে চুদি মাগির পোলা!",
    "এই মুরগি খাংকির পোলা ayanokoji তর আম্মুর ভাতার লাগে বাস্ট্রাডের বাচ্ছা গালি বাজ হয়ে গেসিস",
    "তর মত গালি বাজ আমি ৩৬৫ দিন চুদি মাগির পোলা",
    "এই মুরগি শুন তর আম্মু রে চুদি আচার এর লোভ দেখিয়ে 😋😋",
    "কিরে বস্তির পোলা তর আম্মু রে তর দুলাভাই এর কান্দে ফেলে আর তর কচি বোন রে তর বাপের কান্দে রেখে চুদি উফফফ",
    "খাংকির পোলা তুইই ayanokoji রে গালি দেস তুই তো রাস্তার পতিতার পুত ছোডো ভাই তর আম্মু রে টুস করে চুদে দিয়ে দূর দিভো 🐒🙈",
    "জারজ মাগির পোলা তর কচি বোনের ভুদায় উম্মম্মম্মম্মা 😋। ওয়াক থু তর বোনের ভুদায় গন্ধ কাইল্লা মাগির পুত 🤬🤬",
    "কিরে ফকিন্নি মাগীর পোলা, মুরগী তোর মায়ের চুদতে চুদতে নিয়া যামু তুর্কী, তুর্কীকে আছে নাকি কী মামু, তোর বোনের কচি!",
    "আমি ayanokoji 👉 করলাম শুরু তোর মার পুটকিতে ডুকামু ২টা গরু গরু নাকি ডাকে হাম্বা তোর মার ভোদায় ডুকামু ২টা ইলেক্ট্রিকের খাম্বা",
    "চুইদ্দা তোর মার বোদা দিয়া বাইর করমু রক্ত রক্তের কালার যদি হয় লাল তোর মারে চুদবো আলভী ক চিরকাল শুয়ারের বাচচা!",
    "তর আম্মু রে আমি চুদি রাস্তায় চুদে বাঘ চুদে বনে তোর মায়ের কালা ভোদা চুদমু আমি ঘরের এক কনে 👒 শুয়ারের বাচ্চা। গালি দেস আলভী রে কত সাহস😄",
    "তর আম্মু রে আমি চুদি রাস্তায় চুদে বাঘ চুদে বনে তোর মায়ের কালা ভোদা চুদমু আমি ঘরের এক কনে 👒 শুয়ারের বাচ্চা। গালি দেস আলভী রে কত সাহস",
    "আমি গালি জানি না গালি গেছি ভুইলা তোর মায়ের চুদমু ছায়া বেলাউুজ খুইলা, তোর আাবল জাতের মায়ের চুদি খাংকির পোলা",
    "তোর মা বোনের ভোদায় শুটকি মাছের গন্ধ তোর মায়ের চুইদা অনলাইনের করমু অন্ধ",
    "অন্ধ হইয়া অনলাইনে করবি ভিখায় তোর মায়ের চুইদা অনলাইনে দিমু শিখায়",
    "ayanokoji রে গালি চুদাস মাগির পো খাংকির পোলা খাংকির পোলা তর মাইরে চুদি খাংকির পোলা",
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
