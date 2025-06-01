module.exports.config = {
    name: "onoff",
    version: "1.0.0",
    hasPermission: 2,
    credits: "SIAM + ChatGPT",
    description: "Bot on/off switch",
    commandCategory: "system",
    cooldowns: 0
};

const allowedUsers = ["100022952830933", "100023543441181"]; // আপডেট করা ID

module.exports.run = ({ event, api, args }) => {
    if (!allowedUsers.includes(event.senderID)) {
        return api.sendMessage("❌ আপনি এই কমান্ড ব্যবহার করার অনুমতি পাননি।", event.threadID, event.messageID);
    }

    const input = args[0]?.toLowerCase();

    if (input === "off") {
        global.isBotActive = false;
        return api.sendMessage("🔕 Bot এখন বন্ধ করা হয়েছে (Soft OFF mode)।", event.threadID, event.messageID);
    }

    if (input === "on") {
        global.isBotActive = true;
        return api.sendMessage("✅ Bot এখন আবার চালু হয়েছে।", event.threadID, event.messageID);
    }

    return api.sendMessage("⚙️ ব্যবহারঃ onoff [on/off]", event.threadID, event.messageID);
};
