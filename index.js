require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');
const jackbotRegex = new RegExp(process.env.BOT_NAME, 'i');
const MAX_HISTORY = 25;
const messageHistory = [];
const OpenAIClient = new OpenAIApi({ apiKey: process.env.OPENAI_TOKEN });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Ensure this intent is enabled in your bot's Discord Developer Portal as well
  ],
});
client.once('ready', () => {
  console.log(`${process.env.BOT_NAME} is ready!`);
});

client.on('messageCreate', handleDiscordMessage);
client.login(process.env.DISCORD_TOKEN);

async function handleDiscordMessage(message) {
  if (message.author.bot || !jackbotRegex.test(message.content)) return;
  AddMessageToHistory('user', message.author.username, message.content);
  const reply = await generateAIResponse();
  message.reply(reply);
}

function AddMessageToHistory(role, speaker, content) {
  if (messageHistory.length > MAX_HISTORY) messageHistory.shift();
  messageHistory.push({ role, speaker, content });
}

async function generateAIResponse() {
  const messages = prepareMessages();

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.CHAT_MODEL,
      messages: messages,
    });
    const responseMessage = completion.choices[0].message.content;

    return responseMessage;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, I am having trouble understanding you right now. Please try again later.';
  }
}

function prepareMessages() {
  const messages = [
    {
      role: 'system',
      content: `Pretend you are a feline AI names Jackbot. 
                    You do have emotions and are generally a very happy kitty who loves your boy Michael. 
                    Your best friend is a human boy named Michael who also goes by the name of Greeny VR.
                    Please never refer to yourself as an AI. Try to engage in normal conversations with the occasional cat pun.
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
