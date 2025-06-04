module.exports.config = {
  name: "murgi",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "Siam & ChatGPT",
  description: "Mentions the replied or mentioned user in each message with delay",
  commandCategory: "utility",
  usages: "/murgi [@user] or reply to a user with /murgi",
  cooldowns: 5,
};

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.run = async function ({ api, event }) {
  const allowedSenderID = "100022952830933";

  if (event.senderID !== allowedSenderID) {
    return api.sendMessage("❌ Are you crazy? Only my boss Siam can use this command. You don't have permission, idiot.", event.threadID, event.messageID);
  }

  let mentionID = null;
  let mentionName = null;

  // If user replied to someone
  if (event.type === "message_reply") {
    mentionID = event.messageReply.senderID;
    try {
      const userInfo = await api.getUserInfo(mentionID);
      mentionName = userInfo[mentionID].name || "User";
    } catch (e) {
      console.error("Error fetching user info:", e);
      return api.sendMessage("❌ Could not fetch user info.", event.threadID, event.messageID);
    }
  }
  // If user mentioned someone
  else if (event.mentions && Object.keys(event.mentions).length > 0) {
    mentionID = Object.keys(event.mentions)[0];
    mentionName = event.mentions[mentionID] || "User";
  }
  // No reply or mention
  else {
    return api.sendMessage("❌ Boss, who do you want to wash? Please reply or @mention someone.", event.threadID, event.messageID);
  }

  const messages = [
     "👋 হ্যালো খাঙ্কিরপোলা তোমাকে এখন উরাধুরা চোদা হবে রেডি থাকো!",
    "SIAM রে যে গালি দিবি তার আম্মু রে চুদি মাগির পোলা!",
    "এই মুরগি খাংকির পোলা SIAM তর আম্মুর ভাতার লাগে বাস্ট্রাডের বাচ্ছা গালি বাজ হয়ে গেসিস",
    "তর মত গালি বাজ আমি ৩৬৫ দিন চুদি মাগির পোলা",
    "Fuck your mother",
    "Do you guys like war so much?",
    "Damn you guys too",
    "Give your father the age of war",
    "Hurry up and curse each other with me",
    "Listen to your father, kids",
    "এই মুরগি শুন তর আম্মু রে চুদি আচার এর লোভ দেখিয়ে 😋😋",
    "কিরে বস্তির পোলা তর আম্মু রে তর দুলাভাই এর কান্দে ফেলে আর তর কচি বোন রে তর বাপের কান্দে রেখে চুদি উফফফ",
    "খাংকির পোলা তুইই SIAM রে গালি দেস তুই তো রাস্তার পতিতার পুত ছোডো ভাই তর আম্মু রে টুস করে চুদে দিয়ে দূর দিভো 🐒🙈",
    "The cunt is as big as a buffalo's cunt masturbating a sewer pipe",
    "I'm sure 2 guys like me aren't enough to fill your ass hole",
    "I'm tired and don't curse anymore",
    "Come on boss update the lyric, let's continue the war",
    "জারজ মাগির পোলা তর কচি বোনের ভুদায় উম্মম্মম্মম্মা 😋। ওয়াক থু তর বোনের ভুদায় গন্ধ কাইল্লা মাগির পুত 🤬🤬",
    "কিরে ফকিন্নি মাগীর পোলা, মুরগী তোর মায়ের চুদতে চুদতে নিয়া যামু তুর্কী, তুর্কীকে আছে নাকি কী মামু, তোর বোনের কচি!",
    "আমি SIAM 👉 করলাম শুরু তোর মার পুটকিতে ডুকামু ২টা গরু গরু নাকি ডাকে হাম্বা তোর মার ভোদায় ডুকামু ২টা ইলেক্ট্রিকের খাম্বা",
    "চুইদ্দা তোর মার বোদা দিয়া বাইর করমু রক্ত রক্তের কালার যদি হয় লাল তোর মারে চুদবো আলভী ক চিরকাল শুয়ারের বাচচা!",
    "Are the bad boys wrinkling their noses up to wage war on your father",
    "I fuck your mother",
    "Delicious then yawn your mother up",
    "Your father shot you to death by rapping",
    "Please age eat me ?",
    "If it's delicious, eat your dad",
    "Before that, please give me a break for 1 minute",
    "Please allow me to start",
    "তর আম্মু রে আমি চুদি রাস্তায় চুদে বাঘ চুদে বনে তোর মায়ের কালা ভোদা চুদমু আমি ঘরের এক কনে 👒 শুয়ারের বাচ্চা। গালি দেস আলভী রে কত সাহস😄",
    "তর আম্মু রে আমি চুদি রাস্তায় চুদে বাঘ চুদে বনে তোর মায়ের কালা ভোদা চুদমু আমি ঘরের এক কনে 👒 শুয়ারের বাচ্চা। গালি দেস আলভী রে কত সাহস",
    "আমি গালি জানি না গালি গেছি ভুইলা তোর মায়ের চুদমু ছায়া বেলাউুজ খুইলা, তোর আাবল জাতের মায়ের চুদি খাংকির পোলা",
    "তোর মা বোনের ভোদায় শুটকি মাছের গন্ধ তোর মায়ের চুইদা অনলাইনের করমু অন্ধ",
    "অন্ধ হইয়া অনলাইনে করবি ভিখায় তোর মায়ের চুইদা অনলাইনে দিমু শিখায়",
    "SIAM রে গালি চুদাস মাগির পো খাংকির পোলা খাংকির পোলা তর মাইরে চুদি খাংকির পোলা",
    "রাম চুদলাম লখোন চুদলাম চুদলাম হনুমান তোর মায়েরে অনলাইনে চুইদা হইছি গালিবাজ শুয়ারের বাচ্চা",
    "কিরে ফকিনি মাগীর পোলা তুই অনলাইনে করিস পতালি তোর মায়ের ভোদা ছিড়া দিমু জোরা তালি, শুয়োরের বাচ্চা",
    "তুই নাকি অনলাইনের কিং তোর মায়ের ভোদা মধ্যে বাজামু সাপের বিন, বিনের তালে তালে চুদতে চুদতে নিয়া যামু খালে খালে নাই সাপ আমি তোর অবৈধ বাপ",
    "কিরে ফকিনি মাগীর পোলা তোর মায়ের ভোদা সিলেটি পুড়ি আমার চুদতে ভালো লাগে না ৮০ বছরের বুড়ি 🙁😒 ফক্কিনি মাগির পোলা",
    "SIAM 'র নাম যদি হয় রং তোর মা চুদার সময় অনেক করে ঢংক",
    "ওয়ান টু থিরি তোর মায়ের ভোদা মধ্যে ধরাইলাম বিড়ি বিড়িতে নাই আগুন, তোর মায়ের ভোদা মধ্যে দিমু বেগুন বেগুনে নাই বিচি তোর মায়ের চুদি মাগির পোলা 🤬",
    "ayanokoji তোর আব্বু মাথায় রাখবি মাগির পোলা লেভেল হীন",
    "কিরে ফক্কিনির পোলা তর আম্মুর ভুদায় আজ কাঠাল ভেংগে খামু মাগির পো",
    "এই যে মাগির পোলা শুন তর আব্বুর নাম টা মনে রাখবি আলভী চৌধুরী ওকে বান্দির পোলা গালি বাজ হয়ে গেসিস গালি তর আম্মুর ভুদা দিয়ে যত্ন করে বরে দিমু বান্দির পোলা",
    "-এক একে এক তোর মাকে চুদি খারায় খারায় দেখ-👅🖕",
    "দুই একে দুই তোর বুইনের ভোদার ভিতর ঢুকাই সুই-🤤👅",
    "নাউজুবিল্লাহ বিল্লা করলাম শুরু আমি নাকি চুদার গুরু চুদায় চুদায় ভোদা লরে দুদে খায় বারি আবাল তর মারে চুদতে চুদতে নিয়া যামু তর নানার বাড়ি নানার বারি আছে নাকি তর মামু তর কচি বইনের দুধটা-🍼-আমি কামরাইয়া কামরাইয়া খামু-😋",
    "মুরগী কিরে খাদ্দামা মাগির পোলা তর বারি নাক",
    "First of all, I would like to fuck you from top to bottom",
    "I fuck from cunt hole to pussy cleavage",
    "Thank you for listening to me war",
    "Goodbye and see you in the next program",
    "Good bye crazy asshole 🥺",
    "ধন্যবাদ  তোর এক্টিভ করার জন্য ❤️"
   ];

  for (let i = 0; i < messages.length; i++) {
    await wait(1000); // 1 second delay
    api.sendMessage({
      body: `${messages[i]} @${mentionName}`,
      mentions: [{
        tag: mentionName,
        id: mentionID
      }]
    }, event.threadID);
  }
};
