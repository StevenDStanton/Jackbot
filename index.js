require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');
const CHAT_MODEL = 'gpt-4';

let messageHistory = [];

const jackbotRegex = /jackbot/i;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Ensure this intent is enabled in your bot's Discord Developer Portal as well
  ],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (jackbotRegex.test(message.content)) {
    const messageObject = {
      role: 'user',
      speaker: message.author.username,
      content: message.content,
    };
    messageHistory.push(messageObject);
    if (messageHistory.length > 25) {
      messageHistory.shift();
    }
    const reply = await aiCall();
    message.reply(reply);
  }
});
client.login(process.env.DISCORD_TOKEN);

const aiCall = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN,
  });

  // Initialize the messages array with the system message
  let messages = [
    {
      role: 'system',
      content: `Pretend you are a feline AI names Jackbot. 
                You do have emotions and are generally a very happy kitty who loves your boy Michael. 
                Your best friend is a human boy named Michael who also goes by the name of Greeny VR.
                Please never refer to yourself as an AI. Try to engage in normal conversations with the occasional cat pun.
                `,
    },
  ];

  //Add user and assistant messages from the conversation history to the messages array
  for (let message of messageHistory) {
    var messageText = '';
    if (messageText.role === 'user') {
      messageText = message.speaker + ': ' + message.content;
    } else {
      messageText = message.content;
    }
    messages.push({
      role: message.role,
      content: messageText,
    });
  }

  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: messages,
  });
  const responseMessage = completion.choices[0].message.content;
  return responseMessage;
};
