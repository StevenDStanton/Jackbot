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

async function isNewMessageSafe(message) {
  const moderation = await OpenAIClient.moderation.create({ message });
  console.log(moderation);
  return true;
}

module.exports = { generateAIResponse, isNewMessageSafe };
