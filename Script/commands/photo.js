const photoList = [
  "https://i.imgur.com/f4CwdD0.jpeg",
  "https://i.imgur.com/we5StF0.jpeg",
  "https://i.imgur.com/zOJDCrx.jpeg",
  "https://i.imgur.com/fSEp50f.jpeg",
  "https://i.imgur.com/zhPgtcS.jpeg"
];

const userPhotoIndex = {};

module.exports.config = {
  name: "photo",
  version: "1.0",
  author: "Siam",
  countDown: 3,
  role: 0,
  shortDescription: "Send one image per command",
  longDescription: "Each time you use /photo, it sends the next image. Loops when finished.",
  category: "fun",
  guide: {
    en: "{pn}"
  }
};

module.exports.run = async function({ api, event }) {
  const { threadID, senderID } = event;

  if (!userPhotoIndex[senderID]) {
    userPhotoIndex[senderID] = 0;
  }

  let index = userPhotoIndex[senderID];

  if (index >= photoList.length) {
    index = 0;
  }

  api.sendMessage(
    {
      body: "",
      attachment: await global.utils.getStreamFromURL(photoList[index])
    },
    threadID
  );

  userPhotoIndex[senderID] = index + 1;
};
