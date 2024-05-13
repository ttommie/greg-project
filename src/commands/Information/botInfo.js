const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'botinfo',
  description: 'Replies with Bot Information',
  usage: '$botinfo',
  aliases: ['botinfo', 'bi', 'bot'],
  dir: 'Information',
  permissions: [],

  async execute(client, message) {
    const botInfoEmbed = new EmbedBuilder();
    const memberCount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

    botInfoEmbed.setColor('#36393F');
    botInfoEmbed.setAuthor({ name: '🤖 | Greg Project - $botinfo', url: 'https://github.com/ttommie/greg-project/' });
    botInfoEmbed.addFields(
      { name: 'Bot Name', value: `${client.user.username}`, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Creator', value: '[tommy](https://github.com/ttommie)', inline: true },
      { name: 'Server Count', value: `${client.guilds.cache.size}`, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Total Members', value: `${memberCount}`, inline: true },
      { name: 'Creation Date:', value: `${moment(client.user.createdAt).format('LL')}`, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Uptime', value: `${BotUptime(client)}`, inline: true },
      { name: 'Bot Version', value: 'v1.0.0', inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Node Version', value: '[v18.17.0](https://nodejs.org/en/blog/release/v18.17.0)', inline: true },
    );
    botInfoEmbed.setThumbnail(client.user.displayAvatarURL());

    const buttonComponents = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        // TODO: SET INV URL
        .setLabel('Bot Invite')
        .setStyle(ButtonStyle.Link)
        .setURL('https://github.com/ttommie'),

      // TODO: FIX LINK (MAYBE PACKAGE LOCK 2)
      new ButtonBuilder()
        .setLabel('Create Issue')
        .setStyle(ButtonStyle.Link)
        .setURL('https://github.com/ttommie/greg-project/issues'),
    );

    message.channel.send({ embeds: [botInfoEmbed], components: [buttonComponents] });
  },
};

function BotUptime(client) {
  let totalSeconds = client.uptime / 1000;
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${days}d, ${hours}h, ${minutes}m ${seconds}s`;
}