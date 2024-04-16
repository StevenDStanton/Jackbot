const { Client, GatewayIntentBits } = require('discord.js');
const { handleDiscordMessage } = require('./handlers/discordMessageHandler');

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
