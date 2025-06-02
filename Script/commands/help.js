module.exports.config = {

  name: "help",

  version: "1.0.2",

  hasPermssion: 0,

  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",

  description: "FREE SET-UP MESSENGER",

  commandCategory: "system",

  usages: "[name module]",

  cooldowns: 5,

  envConfig: {

    autoUnsend: true,

    delayUnsend: 20

  }

};


module.exports.languages = {

  "en": {

    "moduleInfo": "╭•┄┅═══❁🌸❁═══┅┄•╮\n🌼 𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁 🌼\n\n🌺 • 𝗡𝗮𝗺𝗲: %1\n🌺 • 𝗨𝘀𝗮𝗴𝗲: %3\n🌺 • 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n🌺 • 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n🌺 • 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝗧𝗶𝗺𝗲: %5s\n🌺 • 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n🌸 𝗖𝗿𝗲𝗱𝗶𝘁𝘀: %7\n╰•┄┅═══❁🌸❁═══┅┄•╯",

    "helpList": '[ There are %1 commands on this bot. Use: "%2help nameCommand" to know how to use! ]',

    "user": "User",

    "adminGroup": "Admin Group",

    "adminBot": "Admin Bot"

  }

};


module.exports.handleEvent = function ({ api, event, getText }) {

  const { commands } = global.client;

  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;


  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);

  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  const command = commands.get(splitBody[1].toLowerCase());

  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;


  return api.sendMessage(getText("moduleInfo",

    command.config.name,

    command.config.description,

    ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""},

    command.config.commandCategory,

    command.config.cooldowns,

    ((command.config.hasPermssion == 0) ? getText("user") :

      (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")),

    command.config.credits

  ), threadID, messageID);

};


module.exports.run = async function ({ api, event, args, getText }) {

  const axios = require("axios");

  const request = require("request");

  const fs = require("fs-extra");

  const { commands } = global.client;

  const { threadID, messageID } = event;

  const command = commands.get((args[0] || "").toLowerCase());

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];

  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;


  // Help all

  if (args[0] == "all") {

    const cmdGroups = [];

    let msg = "";

    for (const cmd of commands.values()) {

      const cat = cmd.config.commandCategory.toLowerCase();

      const entry = cmdGroups.find(g => g.group === cat);

      if (entry) entry.cmds.push(cmd.config.name);

      else cmdGroups.push({ group: cat, cmds: [cmd.config.name] });

    }


    cmdGroups.forEach(group => {

      msg +🌷 ${group.group.charAt(0).toUpperCase() + group.group.slice(1)}\n🌸 ${group.cmds.join(' • ')}\n\nn`;

    });


    const res = await axios.get("https://loidsenpaihelpapi.miraiandgoat.repl.co");

    const ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);

    const imgPath = __dirname + /cache/helpall.${ext};

    const admID = "61551846081032";


    api.getUserInfo(parseInt(admID), (err, data) => {

      if (err) return console.log(err);

      const firstname = data[Object.keys(data)].name.replace("@", "");

      const callback = () => {

        api.sendMes╭•┄┅═══❁🌺❁═══┅┄•╮\n🌸 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 🌸\n\n${msg}🌼 𝗨𝘀𝗲: ${prefix}help [Name/Page]\n🌼 𝗢𝘄𝗻𝗲𝗿: Ullash ッ\n🌼 𝗧𝗼𝘁𝗮𝗹: ${commands.size}\n╰•┄┅═══❁🌺❁═══┅┄•╯ize}\n╰•┄┅═══❁🌺❁═══┅┄•╯`,

          mentions: [{ tag: firstname, id: admID }],

          attachment: fs.createReadStream(imgPath)

        }, threadID, (err, info) => {

          fs.unlinkSync(imgPath);

          if (autoUnsend) {

            setTimeout(() => api.unsendMessage(info.messageID), delayUnsend * 1000);

          }

        }, messageID);

      };

      request(res.data.data).pipe(fs.createWriteStream(imgPath)).on("close", callback);

    });

    return;

  }


  // Help with pagination or command

  const arrayInfo = Array.from(commands.keys()).sort();

  const page = parseInt(args[0]) || 1;

  const max = 15;

  const first = max * (page - 1);

  const list = arrayInfo.slice(first, first + max);

  if (!command) {

    let msg = list.🌻 •—» [ ${name} ] «—•name} ] «—•`).join("\n╭•┄┅═══❁🌸❁═══┅┄•╮\n🌼 𝗨𝘀𝗲: ${prefix}help [Name/Page]\n🌼 𝗢𝘄𝗻𝗲𝗿: Ullash ッ\n🌼 𝗧𝗼𝘁𝗮𝗹: ${arrayInfo.length} Commands\n🌼 𝗣𝗮𝗴𝗲: ${page}/${Math.ceil(arrayInfo.length / max)}\n╰•┄┅═══❁🌸❁═══┅┄•╯)}\n╰•┄┅═══❁🌸❁═══┅┄•╯`;

    const images = [

      "https://i.imgur.com/WXQIgMz.jpeg",

      "https://i.imgur.com/HPaSlBu.jpeg",

      "https://i.imgur.com/ybM9Wtr.jpeg"

    ];

    const imgURL = images[Math.floor(Math.random() * images.length)];

    const filePath = __dirname + "/cache/helpflower.jpg";

    const callback = () => api.sendMessage({ body: msg + "\n\n" + text, attachment: fs.createReadStream(filePath) }, threadID, () => fs.unlinkSync(filePath), messageID);

    return request(encodeURI(imgURL)).pipe(fs.createWriteStream(filePath)).on("close", callback);

  }


  // Specific command help

  const detail = getText("moduleInfo",

    command.config.name,

    command.config.description,

    ${prefix}${command.config.name} ${command.config.usages || ""},

    command.config.commandCategory,

    command.config.cooldowns,

    ((command.config.hasPermssion == 0) ? getText("user") :

      (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")),

    command.config.credits

  );


  const img = "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif";

  const filePath = __dirname + "/cache/helpcommand.jpg";

  const callback = () => api.sendMessage({ body: detail, attachment: fs.createReadStream(filePath) }, threadID, () => fs.unlinkSync(filePath), messageID);

  return request(encodeURI(img)).pipe(fs.createWriteStream(filePath)).on("close", callback);

};
