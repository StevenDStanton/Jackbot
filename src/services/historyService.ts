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

  const channelMessages = messageHistory.get(channelId);

  if (!channelMessages) {
    throw new Error(
      "Adding this because Typscript isn't smart enough to realize I already checked if this exists above. If this ever happens let me know",
    );
  }

  if (channelMessages.length >= MAX_HISTORY) {
    channelMessages.shift();
  }
  insertChatRow(role, speaker, content, channelId);
  channelMessages.push({ role, speaker, content });
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

  const channelMessages = messageHistory.get(channelId);

  if (!channelMessages) {
    throw new Error(
      "Adding this because Typscript isn't smart enough to realize I already checked if this exists above. If this ever happens let me know",
    );
  }

  channelMessages.forEach((message) => {
    messages.push({
      role: message.role as 'user' | 'assistant',
      name: message.speaker,
      content: message.content,
    });
  });

  return messages;
}

export { addMessageToHistory, prepareMessages };
