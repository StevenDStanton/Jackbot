const { generateAIResponse } = require('./aiMessageHandler');
const { addMessageToHistory } = require('../utils/historyManager');
const jackbotRegex = new RegExp(process.env.BOT_NAME, 'i');

async function handleDiscordMessage(message) {
  console.log(message);
  if (message.author.username === process.env.OWNER_NAME) {
    //return;
  }
  if (message.author.bot || !jackbotRegex.test(message.content)) return;

  addMessageToHistory('user', message.author.username, message.content);
  const reply = await generateAIResponse();
  message.reply(reply);
}

module.exports = { handleDiscordMessage };
