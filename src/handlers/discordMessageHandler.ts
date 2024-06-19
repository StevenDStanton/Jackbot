import { Message } from 'discord.js';
import { insertModViolation } from '../services/databaseService';
import {
  generateAIResponse,
  isNewMessageModeratorFlagged,
} from './aiMessageHandler';
import { addMessageToHistory } from '../services/historyService';

const botRegex = new RegExp(process.env.BOT_NAME || '', 'i');

async function handleDiscordMessage(message: Message): Promise<void> {
  if (
    message.author.bot ||
    (!botRegex.test(message.content) && message.guildId !== null)
  ) {
    return;
  }
  if (
    !message.content ||
    !message.channelId ||
    !message.author.globalName ||
    !message.author.discriminator
  ) {
    throw new Error('Malformed message object');
  }
  if (await isNewMessageModeratorFlagged(message.content)) {
    message.reply(
      `Nope, ${process.env.ANIMAL} can't process that type of content`,
    );
    console.error(
      'Moderator flagged message:',
      message.author.globalName,
      message.author.discriminator,
      message.content,
    );
    insertModViolation(
      message.author.globalName,
      message.author.discriminator,
      message.content,
    );
    return;
  }
  addMessageToHistory(
    'user',
    message.author.globalName,
    message.content,
    message.channelId,
  );
  const reply = await generateAIResponse(message.channelId);
  console.log(reply);
  message.reply(reply);
}

export { handleDiscordMessage };
