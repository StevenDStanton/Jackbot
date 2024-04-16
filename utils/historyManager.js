// const { insertChatRow } = require('./db');
const MAX_HISTORY = 25;
const messageHistory = [];

function addMessageToHistory(role, speaker, content) {
  // insertChatRow(role, speaker, content);
  if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
  messageHistory.push({ role, speaker, content });
}

function prepareMessages() {
  const messages = [
    {
      role: 'system',
      content: `${process.env.BOT_PROMPT}`,
    },
  ];

  for (let message of messageHistory) {
    let messageContent = '';
    if (message.author.bot) {
      messageContent = `${message.content}`;
    } else {
      messageContent = `${message.speaker}: ${message.content}`;
    }
    messages.push({
      role: message.role,
      content: messageContent,
    });
  }

  return messages;
}

function dumpMessageHistory() {
  let messageHistoryLog = '';
  for (let message of messageHistory) {
    console.log(`${message.speaker}: ${message.content}`);
    messageHistoryLog += `${message.speaker}: ${message.content}\n\n`;
  }
  return messageHistoryLog;
}

module.exports = { addMessageToHistory, prepareMessages, dumpMessageHistory };
