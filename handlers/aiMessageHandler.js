const OpenAIAPI = require('openai');
const { prepareMessages } = require('../utils/historyManager');

const OpenAIClient = new OpenAIAPI({ apiKey: process.env.OPENAI_TOKEN });

async function generateAIResponse() {
  const messages = prepareMessages();

  try {
    const completion = await OpenAIClient.chat.completions.create({
      model: process.env.CHAT_MODEL,
      messages: messages,
    });
    const responseMessage = completion.choices[0].message.content;

    return responseMessage;
  } catch (error) {
    console.error('Error:', error);
    return `Sorry, I'm having a pawsitively hard time understanding you right meow. Please try again later`;
  }
}

module.exports = { generateAIResponse };
