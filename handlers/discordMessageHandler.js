const { generateAIResponse } = require('./aiMessageHandler');
const { addMessageToHistory } = require('../utils/historyManager');
const jackbotRegex = new RegExp(process.env.BOT_NAME, 'i');

async function handleDiscordMessage(message) {
  if (message.author.bot || !jackbotRegex.test(message.content)) return;
  if (message.author.username === process.env.OWNER_NAME) {
    console.log(message);
    return;
  }
  addMessageToHistory('user', message.author.username, message.content);
  const reply = await generateAIResponse();
  message.reply(reply);
}

module.exports = { handleDiscordMessage };
