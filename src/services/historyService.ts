// import { insertChatRow } from './db';

interface Message {
  role: string;
  speaker: string;
  content: string;
}

const MAX_HISTORY = 25;
const messageHistory: Message[] = [];

function addMessageToHistory(
  role: string,
  speaker: string,
  content: string,
): void {
  if (messageHistory.length >= MAX_HISTORY) {
    messageHistory.shift();
  }
  messageHistory.push({ role, speaker, content });
}

function prepareMessages(): {
  role: 'user' | 'assistant' | 'system';
  name: string;
  content: string;
}[] {
  const messages: {
    role: 'user' | 'assistant' | 'system';
    name: string;
    content: string;
  }[] = [
    {
      role: 'system',
      name: 'System',
      content: process.env.BOT_PROMPT || 'Default prompt',
    },
  ];

  messageHistory.forEach((message) => {
    messages.push({
      role: message.role as 'user' | 'assistant',
      name: message.speaker,
      content: message.content,
    });
  });

  return messages;
}

function dumpMessageHistory(): string {
  let messageHistoryLog = '';
  messageHistory.forEach((message) => {
    console.log(`${message.speaker}: ${message.content}`);
    messageHistoryLog += `${message.speaker}: ${message.content}\n\n`;
  });
  return messageHistoryLog;
}

export { addMessageToHistory, prepareMessages, dumpMessageHistory };
