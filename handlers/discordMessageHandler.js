const { generateAIResponse, isNewMessageSafe } = require('./aiMessageHandler');
const {
  addMessageToHistory,
  dumpMessageHistory,
} = require('../utils/historyManager');
const jackbotRegex = new RegExp(process.env.BOT_NAME, 'i');

async function handleDiscordMessage(message) {
  if (
    message.author.globalName === process.env.OWNER_NAME &&
    message.author.discriminator === process.env.DISCRIMINATOR &&
    message.content === 'dump logs'
  ) {
    const messageHistoryDump = dumpMessageHistory();
    message.reply(messageHistoryDump);
    return;
  }

  if (message.author.bot || !jackbotRegex.test(message.content)) return;

  if (!isNewMessageSafe(message.content)) {
    message.reply("Nope, Kitty can't process that type of content");
    return;
  }

  addMessageToHistory('user', message.author.username, message.content);
  const reply = await generateAIResponse();
  message.reply(reply);
}

module.exports = { handleDiscordMessage };
