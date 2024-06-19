import OpenAIAPI from 'openai';
import {
  addMessageToHistory,
  prepareMessages,
} from '../services/historyService';

const OpenAIClient = new OpenAIAPI({
  apiKey: process.env.OPENAI_TOKEN || '',
});

async function generateAIResponse(channelId: string): Promise<string> {
  const messages = prepareMessages(channelId);

  try {
    const completion = await OpenAIClient.chat.completions.create({
      model: process.env.CHAT_MODEL || 'gpt-3.5-turbo',
      messages: messages,
    });
    const responseMessage = completion.choices[0].message.content;
    if (!responseMessage) {
      throw new Error('No response message');
    }
    addMessageToHistory(
      'assistant',
      process.env.BOT_NAME || 'Bot',
      responseMessage,
      channelId,
    );
    return responseMessage;
  } catch (error: any) {
    console.error('Error:', error.message);
    const errorText = `Sorry, I'm having a pawsitively hard time understanding you right meow. Please try again later.`;
    addMessageToHistory(
      'assistant',
      process.env.BOT_NAME || 'Bot',
      errorText,
      channelId,
    );
    return errorText;
  }
}

async function isNewMessageModeratorFlagged(message: string): Promise<boolean> {
  try {
    const moderation = await OpenAIClient.moderations.create({
      input: message,
    });
    return moderation.results[0].flagged;
  } catch (error: any) {
    console.error('Moderation error:', error.message);
    return false;
  }
}

export { generateAIResponse, isNewMessageModeratorFlagged };
