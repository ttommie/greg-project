const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: ' Displays information about the server.',
  usage: '$serverinfo',
  aliases: ['serverinfo', 'si', 'server'],
  dir: 'Information',
  permissions: [],

  async execute(client, message) {
    const serverInfoEmbed = new EmbedBuilder();
    const guild = message.guild;

    // Fetch member cache before embed display
    await guild.members.fetch({ client, force: true });

    // Server counts
    const userCount = guild.members.cache.filter((member) => !member.user.bot).size;
    const botCount = guild.members.cache.filter((member) => member.user.bot).size;
    const textCount = guild.channels.cache.filter((channels) => channels.type === ChannelType.GuildText).size;
    const voiceCount = guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size;
    const roleCount = guild.roles.cache.size - 1;

    serverInfoEmbed.setColor('#36393F');
    serverInfoEmbed.setAuthor({
      name: '🧭 | Greg Project - $serverinfo',
      url: 'https://github.com/ttommie/greg-project/',
    });
    serverInfoEmbed.addFields(
      {
        name: 'Basic Info 🖥',
        value: `Name: \`${guild.name}\` \nServer ID: \`${guild.id}\` \nOwner: <@${guild.ownerId}>`,
        inline: true,
      },
      { name: 'Members 👥', value: '\t', inline: false },
      { name: 'Users Count', value: `${userCount}`, inline: true },
      { name: 'Bot Count', value: `${botCount}`, inline: true },
      { name: 'Total Count', value: `${guild.memberCount}`, inline: true },
      { name: 'Channels 📺', value: '\t', inline: false },
      { name: 'Text Count', value: `${textCount}`, inline: true },
      { name: 'Voice Count', value: `${voiceCount}`, inline: true },
      { name: 'Roles Count', value: `${roleCount}`, inline: true },
    );
    serverInfoEmbed.setThumbnail(guild.iconURL());
    serverInfoEmbed.setFooter({ text: ' Server Created ' });
    serverInfoEmbed.setTimestamp(guild.createdAt);
    message.channel.send({ embeds: [serverInfoEmbed] });
  },
};
