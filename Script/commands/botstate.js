const fs = require("fs");
const stateFile = __dirname + "/../../botState.json";

module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 2, // শুধু অ্যাডমিন চালাতে পারবে
  credits: "Siam",
  description: "Turn the bot on or off",
  commandCategory: "system",
  usages: "/bot on | /bot off",
  cooldowns: 2
};

module.exports.run = async function ({ api, event, args }) {
  const senderID = event.senderID;

  // শুধু তুমি ব্যবহার করতে পারবে
  if (senderID !== "100022952830933") {
    return api.sendMessage("🔒 শুধুমাত্র বট মালিক এই কমান্ড চালাতে পারে!", event.threadID, event.messageID);
  }

  const command = args[0];

  if (!command || (command !== "on" && command !== "off")) {
    return api.sendMessage("❗Usage: /bot on অথবা /bot off", event.threadID, event.messageID);
  }

  let state = { active: true };
  if (fs.existsSync(stateFile)) {
    state = JSON.parse(fs.readFileSync(stateFile));
  }

  if (command === "on") {
    if (state.active) return api.sendMessage("✅ বট আগেই চালু আছে!", event.threadID, event.messageID);
    state.active = true;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    return api.sendMessage("✅ বট চালু করা হয়েছে!", event.threadID, event.messageID);
  }

  if (command === "off") {
    if (!state.active) return api.sendMessage("⚠️ বট আগেই বন্ধ রয়েছে!", event.threadID, event.messageID);
    state.active = false;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    return api.sendMessage("❌ বট বন্ধ করা হলো!", event.threadID, event.messageID);
  }
};
