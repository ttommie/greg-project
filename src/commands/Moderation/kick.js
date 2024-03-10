const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kicks a user from the server.',
  usage: '$kick <target> <reason>',
  aliases: ['kick'],
  dir: 'Moderation',
  permissions: [PermissionsBitField.Flags.KickMembers],

  async execute(client, message, args) {
    const reason = args.slice(1).join(' ');
    const target = message.mentions.members.first();
    const targetHighestRole = target.roles.highest.position;

    // TODO: ERRORS NEED RESPONSES
    if (!target) return; // Needs a target
    if (target.id === message.member.id) return; // target can't be yourself
    if (reason.length > 512) return; // reason can't exceed 512 characters
    if (message.member.roles.highest.position < targetHighestRole) return; // user being kicked can't have a higher status

    const kickEmbed = new EmbedBuilder();
    kickEmbed.setColor('#36393F');
    kickEmbed.setAuthor({ name: '🥾 | Greg Project - $kick', url: 'https://github.com/ttommie/greg-project/' });
    kickEmbed.setDescription(`${target} has been successfully kicked.`);
    kickEmbed.addFields(
      { name: 'Reason:', value: `${reason === '' ? 'no reason specified.' : reason}`, inline: false },
    );

    // KICK USER HERE: target.kick(reason);

    message.channel.send({ embeds: [kickEmbed] });
  },
};