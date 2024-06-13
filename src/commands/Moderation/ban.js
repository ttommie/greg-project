const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

// TODO: Add arg to delete x amount of messages after ban (up to 7 days)

module.exports = {
  name: 'ban',
  description: 'Bans a user from the server',
  usage: '$ban <target> <reason> <message history deleation>',
  aliases: ['ban'],
  dir: 'Moderation',
  permissions: [PermissionsBitField.Flags.BanMembers],

  async execute(client, message, args) {
    try {
      const target =
        await message.mentions.members.first() || // check tag: @tag
        await message.guild.members.fetch(args[0]);// check ID: '1147217835265896522'

      // FIXME: NOT WORKING YET
      // await client.users.cache.get((r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());// check username
      // message.guild.members.cache.find((ro) => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()); // check display name

      const reason = args.slice(1).join(' ') || 'no reason specified.';
      const targetHighestRole = target.roles.highest.position;

      if (target.id === message.member.id) {
        CommandError(message, ERR_MESSAGES.banSelf);
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

      if (!target.bannable) {
        CommandError(message, ERR_MESSAGES.notBannable);
        return;
      }

      const banEmbed = new EmbedBuilder();
      banEmbed.setColor('#36393F');
      banEmbed.setAuthor({ name: '🚨 | Greg Project - $ban', url: 'https://github.com/ttommie/greg-project/' });
      banEmbed.setDescription(`${target} has been successfully banned.`);
      banEmbed.addFields({ name: 'Reason:', value: `${reason}`, inline: false });

      // BAN USER HERE: target.ban({ deleteMessage, reason });

      message.channel.send({ embeds: [banEmbed] });
    } catch (e) {
      client.logger.error(`${e}`);
    }
  },
};
