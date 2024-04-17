const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { handleDiscordMessage } = require('./handlers/discordMessageHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
client.once('ready', () => {
  console.log(`${process.env.BOT_NAME} is ready!`);
});

client.on('messageCreate', handleDiscordMessage);
client.login(process.env.DISCORD_TOKEN);
