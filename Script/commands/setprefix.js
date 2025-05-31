module.exports.config = {
	name: "setprefix",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Reset group prefix",
	commandCategory: "Group",
	usages: "[prefix/reset]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"successChange": "Đã chuyển đổi prefix của nhóm thành: %1",
		"missingInput": "Phần prefix cần đặt không được để trống",
		"resetPrefix": "Đã reset prefix về mặc định: %1",
		"confirmChange": "Bạn có chắc bạn muốn đổi prefix của nhóm thành: %1"
	},
	"en": {
		"successChange": "Changed prefix into: %1",
		"missingInput": "Prefix have not to be blank",
		"resetPrefix": "Reset prefix to: %1",
		"confirmChange": "Are you sure that you want to change prefix into: %1"
	}
};

module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		api.unsendMessage(handleReaction.messageID);

		// ✅ লিংক সহ success message
		return api.sendMessage(
			`${getText("successChange", handleReaction.PREFIX)}\n\n🎬 Watch this: https://www.youtube.com/shorts/YIaU3itYThY`,
			threadID,
			messageID
		);
	} catch (e) { return console.log(e); }
};

module.exports.run = async ({ api, event, args, Threads, getText }) => {
	if (typeof args[0] == "undefined") return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);

	// ✅ যদি reset হয়
	if (prefix === "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
		return api.sendMessage(
			`${getText("resetPrefix", global.config.PREFIX)}\n\n🎬 Watch this: https://www.youtube.com/shorts/YIaU3itYThY`,
			event.threadID,
			event.messageID
		);
	}

	// ✅ Custom prefix সেট করার সময়
	return api.sendMessage(
		`${getText("confirmChange", prefix)}\n\n🎬 Watch this: https://www.youtube.com/shorts/YIaU3itYThY`,
		event.threadID,
		(error, info) => {
			global.client.handleReaction.push({
				name: "setprefix",
				messageID: info.messageID,
				author: event.senderID,
				PREFIX: prefix
			});
		}
	);
};
