const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

// TODO: Add a DM Feature

module.exports = {
  name: 'kick',
  description: 'Kicks a user from the server.',
  usage: '$kick <target> <reason>',
  aliases: ['kick'],
  dir: 'Moderation',
  permissions: [PermissionsBitField.Flags.KickMembers],

  async execute(client, message, args) {
    const target = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'no reason specified.';
    const targetHighestRole = target.roles.highest.position;

    if (target.id === message.member.id) {
      CommandError(message, ERR_MESSAGES.kickSelf);
      return;
    }

    if (message.member.roles.highest.position < targetHighestRole) {
      CommandError(message, ERR_MESSAGES.permDiff);
      return;
    }

    if (reason.length > 512) {
      CommandError(message, ERR_MESSAGES.reasonSize);
      return;
    }

    const kickEmbed = new EmbedBuilder();
    kickEmbed.setColor('#36393F');
    kickEmbed.setAuthor({ name: '🥾 | Greg Project - $kick', url: 'https://github.com/ttommie/greg-project/' });
    kickEmbed.setDescription(`${target} has been successfully kicked.`);
    kickEmbed.addFields({ name: 'Reason:', value: `${reason}`, inline: false });

    // KICK USER HERE: target.kick(reason);

    message.channel.send({ embeds: [kickEmbed] });
  },
};
