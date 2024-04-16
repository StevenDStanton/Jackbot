const OpenAIAPI = require('openai');
const {
  addMessageToHistory,
  prepareMessages,
} = require('../utils/historyManager');

const OpenAIClient = new OpenAIAPI({ apiKey: process.env.OPENAI_TOKEN });

async function generateAIResponse() {
  const messages = prepareMessages();

  try {
    const completion = await OpenAIClient.chat.completions.create({
      model: process.env.CHAT_MODEL,
      messages: messages,
    });
    const responseMessage = completion.choices[0].message.content;
    addMessageToHistory('assistant', process.env.BOT_NAME, responseMessage);
    return responseMessage;
  } catch (error) {
    console.error('Error:', error.message);
    const errorText = `Sorry, I'm having a pawsitively hard time understanding you right meow. Please try again later`;
    addMessageToHistory('assistant', process.env.BOT_NAME, errorText);
    return errorText;
  }
}

async function isNewMessageModeratorFlagged(message) {
  const moderation = await OpenAIClient.moderations.create({ input: message });
  console.log(moderation.results[0].flagged, message);
  return moderation.results[0].flagged;
}

module.exports = { generateAIResponse, isNewMessageModeratorFlagged };
