const axios = require('axios');

module.exports.config = {
  name: "aichat",
  version: "1.2",
  author: "Siam + ChatGPT",
  description: "Bot replies in fun, flirty English to any language input",
  commandCategory: "chat",
  usages: "Chat naturally in any language, get English replies",
  cooldowns: 2,
  dependencies: {
    axios: ""
  }
};

const OPENAI_API_KEY = "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";

module.exports.handleEvent = async function ({ api, event }) {
  const { body, threadID, senderID } = event;

  if (!body || senderID === api.getCurrentUserID()) return;

  const message = body.trim();

  try {
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: "system",
            content: `You are a funny, flirty and witty chatbot. 
Users can speak in any language, but you always reply in smart, natural English with a playful tone. 
Add emojis to make it feel more human and friendly.`
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const reply = gptResponse.data.choices[0].message.content;
    api.sendMessage(reply, threadID);
  } catch (error) {
    console.error("AI error:", error.response?.data || error.message);
    api.sendMessage("Oops! I'm taking a nap 😴 Try again soon!", threadID);
  }
};
