module.exports.config = {
  name: "help",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Beyonders - Nur Muhammad Siam",
  description: "Fun Time Messenger Bot Command List",
  commandCategory: "system",
  usages: "[Name module]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": 
`╭──────•◈•──────╮
│        𝗙𝘂𝗻 𝗧𝗶𝗺𝗲 𝗕𝗼𝘁 🤹‍♂️
│● Name: •—» %1 «—•
│● Usage: %3
│● Description: %2
│● Category: %4
│● Cooldown: %5s
│● Permission: %6
│ Module by: Nur Muhammad Siam
╰──────•◈•──────╯`,
    "helpList": '[ There are %1 commands on this bot. Use: "%2help [commandName]" to see usage. ]',
    "user": "User",
    "adminGroup": "Group Admin",
    "adminBot": "Bot Admin"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;
  if (!body || typeof body === "undefined" || body.indexOf("help") !== 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  return api.sendMessage(getText("moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`,
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.hasPermssion === 0 ? getText("user") : command.config.hasPermssion === 1 ? getText("adminGroup") : getText("adminBot"),
    command.config.credits
  ), threadID, messageID);
};

module.exports.run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  if (args[0] === "all") {
    const group = [], msgList = [];
    for (const cmd of commands.values()) {
      const cat = cmd.config.commandCategory.toLowerCase();
      if (!group.some(item => item.group === cat)) {
        group.push({ group: cat, cmds: [cmd.config.name] });
      } else {
        group.find(item => item.group === cat).cmds.push(cmd.config.name);
      }
    }
    group.forEach(item => msgList.push(`❄️ ${item.group.charAt(0).toUpperCase() + item.group.slice(1)}\n${item.cmds.join(' • ')}\n`));

    const content = msgList.join('\n');
    const total = commands.size;

    const caption = 
`✿ 𝗙𝘂𝗻 𝗧𝗶𝗺𝗲 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁 ✿
────────────────────────
${content}
────────────────────────
📌 Use: ${prefix}help [commandName]
📌 Total Commands: ${total}
👤 Owner: Nur Muhammad Siam`;

    const imageUrl = "https://postimg.cc/xJt4mWJv";
    const imagePath = __dirname + "/cache/funtime.jpg";
    const callback = () => api.sendMessage({ body: caption, attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
    return request(encodeURI(imageUrl)).pipe(fs.createWriteStream(imagePath)).on("close", callback);
  }

  const command = commands.get((args[0] || "").toLowerCase());
  if (!command) {
    const allCommands = Array.from(commands.keys());
    const page = parseInt(args[0]) || 1;
    const perPage = 15;
    const totalPages = Math.ceil(allCommands.length / perPage);
    const pageCommands = allCommands.slice((page - 1) * perPage, page * perPage);
    const msg = pageCommands.map(cmd => `• ${cmd}`).join('\n');

    const caption = 
`╭──────•◈•──────╮
│  𝗙𝘂𝗻 𝗧𝗶𝗺𝗲 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 📋
│  Page: ${page}/${totalPages}
│  Total: ${allCommands.length}
╰──────•◈•──────╯
${msg}
Use: ${prefix}help [commandName]`;

    const imageUrl = "https://postimg.cc/xJt4mWJv";
    const imagePath = __dirname + "/cache/funtime.jpg";
    const callback = () => api.sendMessage({ body: caption, attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
    return request(encodeURI(imageUrl)).pipe(fs.createWriteStream(imagePath)).on("close", callback);
  }

  // If specific command is provided
  const infoMsg = getText("moduleInfo",
    command.config.name,
    command.config.description,
    `${prefix}${command.config.name} ${command.config.usages || ""}`,
    command.config.commandCategory,
    command.config.cooldowns,
    command.config.hasPermssion === 0 ? getText("user") : command.config.hasPermssion === 1 ? getText("adminGroup") : getText("adminBot"),
    command.config.credits
  );

  const imageUrl = "https://postimg.cc/xJt4mWJv";
  const imagePath = __dirname + "/cache/funtime.jpg";
  const callback = () => api.sendMessage({ body: infoMsg, attachment: fs.createReadStream(imagePath) }, threadID, () => fs.unlinkSync(imagePath), messageID);
  return request(encodeURI(imageUrl)).pipe(fs.createWriteStream(imagePath)).on("close", callback);
};
