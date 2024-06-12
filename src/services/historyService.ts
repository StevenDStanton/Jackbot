import { insertChatRow } from './databaseService';

interface Message {
  role: string;
  speaker: string;
  content: string;
}

const MAX_HISTORY = 25;
const messageHistory = new Map<string, Message[]>();

function addMessageToHistory(
  role: string,
  speaker: string,
  content: string,
  channelId: string,
): void {
  if (!messageHistory.has(channelId)) {
    messageHistory.set(channelId, []);
  }

  if (messageHistory.get(channelId).length >= MAX_HISTORY) {
    messageHistory.get(channelId).shift();
  }
  insertChatRow(role, speaker, content, channelId);
  messageHistory.get(channelId).push({ role, speaker, content });
}

function prepareMessages(channelId: string): {
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

  messageHistory.get(channelId).forEach((message) => {
    messages.push({
      role: message.role as 'user' | 'assistant',
      name: message.speaker,
      content: message.content,
    });
  });

  return messages;
}

export { addMessageToHistory, prepareMessages };
