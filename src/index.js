const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Client
const client = new Client({
  allowedMentions: { parse: ['users', 'roles'] },
  fetchAllMembers: false,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent ],
});

// Config
client.config = require('./../config.js');

// Collections
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();

// Utilities
client.logger = require('./utils/logger.js');
client.color = require('./utils/colors.js');

// Handlers
['events', 'commands', 'errors'].forEach(file => {
  require(`./handlers/${file}`)(client);
});

// Login
client.login(client.config.TOKEN_KEY);