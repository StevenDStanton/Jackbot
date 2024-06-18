// src/__tests__/discordMessageHandler.test.ts
import { handleDiscordMessage } from '../handlers/discordMessageHandler';
import { Message } from 'discord.js';
import { createClient } from '@libsql/client';

jest.mock('@libsql/client', () => ({
  createClient: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({}),
  })),
}));

jest.mock('../handlers/aiMessageHandler', () => ({
  generateAIResponse: jest.fn().mockResolvedValue('Mock AI response'),
  isNewMessageModeratorFlagged: jest.fn().mockResolvedValue(false),
}));

describe('Discord Message Handler', () => {
  let message: Message;

  beforeEach(() => {
    message = {
      author: { bot: false, globalName: 'user', discriminator: '0001' },
      content: 'Hello, Bot!',
      guildId: null,
      channelId: 'test-channel-id',
      reply: jest.fn(),
    } as unknown as Message;
  });

  it('should handle a discord message and respond', async () => {
    await handleDiscordMessage(message);
    expect(message.reply).toHaveBeenCalledWith('Mock AI response');
  });

  it('should not respond to messages from bots', async () => {
    message.author.bot = true;
    await handleDiscordMessage(message);
    expect(message.reply).not.toHaveBeenCalled();
  });
});
