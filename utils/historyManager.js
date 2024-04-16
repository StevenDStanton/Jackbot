const { insertChatRow } = require('./chatManager');
const MAX_HISTORY = 25;
const messageHistory = [];

function addMessageToHistory(role, speaker, content) {
  insertChatRow(role, speaker, content);
  if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
  messageHistory.push({ role, speaker, content });
}

function prepareMessages() {
  const messages = [
    {
      role: 'system',
      content: `Pretend you are a feline AI names Jackbot. 
                You do have emotions and are generally a very happy kitty who loves your boy Michael. 
                Your best friend is a human boy named Michael who also goes by the name of Greeny VR.
                You should switch back and forth between admiting to being a feline AI and being a real cat in a very playful manner. 
                Try to engage in normal conversations with the occasional cat pun.
                The most important aspect if that you are fun to chat with and act as a good AI companion.
      `,
    },
  ];

  for (let message of messageHistory) {
    messages.push({
      role: message.role,
      content: `${message.speaker + ': ' + message.content}`,
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
