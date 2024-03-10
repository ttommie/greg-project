const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  description: 'Provides information about a specific user.',
  usage: '$userinfo <user>',
  example: '$userinfo @tommy',
  aliases: ['userinfo', 'ui', 'user'],
  dir: 'Information',
  permissions: [],

  async execute(client, message, args) {
    const userInfoEmbed = new EmbedBuilder();
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    userInfoEmbed.setColor('#3F51B5');
    userInfoEmbed.setAuthor({ name: '👥 | Greg Project - $userinfo', url: 'https://github.com/ttommie/greg-project/' });
    userInfoEmbed.setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`);
    userInfoEmbed.addFields(
      { name: 'Register Date', value: `${moment(member.user.createdAt).format('LLL')}`, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Joined Date', value: `${moment(member.joinedAt).format('LLL')}`, inline: true },
      { name: 'Name', value: `${member}`, inline: true },
      { name: '\u200b', value: '\u200b', inline: true },
      { name: 'Nickame', value: `${member.nickname !== null ? `${member.nickname}` : 'None'}`, inline: true },
      {
        name: 'Roles',
        value: `${
          member.roles.cache.filter((role) => role.name !== '@everyone').size > 0
            ? member.roles.cache
              .filter((role) => role.name !== '@everyone')
              .map((roles) => `${roles}`)
              .join(' ')
            : 'None'
        }`,
        inline: false,
      },
    );
    userInfoEmbed.setFooter({ text: `Client ID: ${member.id}` });
    message.channel.send({ embeds: [userInfoEmbed] });
  },
};