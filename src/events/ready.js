const { PREFIX } = require('../../config');
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  client.logger.info(`[!] ${client.user.username} is now started...`);
  client.logger.info(
    `[!] greg-project has ${client.commands.size} (${PREFIX}) commands and ${client.slash.size} (/) commands`,
  );
  client.user.setActivity(`${PREFIX}help | github.com/ttommie`, { type: ActivityType.Playing });
};
