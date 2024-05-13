// This file allows you to register slash commands, it must be launched each time you add a new (/) command

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
const config = require('./config');

const commands = [];
readdirSync('./src/slashes/').map(async (dir) => {
  readdirSync(`./src/slashes/${dir}/`).map(async (cmd) => {
    commands.push(require(path.join(__dirname, `./src/slashes/${dir}/${cmd}`)));
  });
});
const rest = new REST({ version: '9' }).setToken(config.TOKEN_KEY);

(async () => {
  try {
    console.log('[Discord API] Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });
    console.log('[Discord API] Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
