const { insertModViolation } = require('../utils/db');
const {
  generateAIResponse,
  isNewMessageModeratorFlagged,
} = require('./aiMessageHandler');
const {
  addMessageToHistory,
  dumpMessageHistory,
} = require('../utils/historyManager');
const botRegex = new RegExp(process.env.BOT_NAME, 'i');

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
  console.log('Message guildID is:', message.guildId);
  if (
    message.author.bot ||
    (!botRegex.test(message.content) && message.guildId !== null)
  )
    return;

  if (await isNewMessageModeratorFlagged(message.content)) {
    message.reply("Nope, Kitty can't process that type of content");
    console.error(
      'Moderator flagged message:',
      message.author.username,
      message.author.discriminator,
      message.content,
    );
    insertModViolation(
      message.author.username,
      message.author.discriminator,
      message.content,
    );
    return;
  }
  console.log('User:', message.author.username, message.content);
  addMessageToHistory('user', message.author.username, message.content);
  const reply = await generateAIResponse();
  console.log(reply);
  message.reply(reply);
}

module.exports = { handleDiscordMessage };
