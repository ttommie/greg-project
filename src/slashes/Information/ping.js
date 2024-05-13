const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Replies with Bot Latency',
  usage: '$ping',
  aliases: ['ping'],
  dir: 'Information',
  permissions: [],
  options: [
    {
      name: 'ping',
      description: 'Replies with Bot Latency',
      type: 3,
      required: false,
      choices: [
        { name: 'yes', value: 'true' },
        { name: 'no', value: 'false' },
      ],
    },
  ],
  async execute(client, interaction) {
    const pingEmbed = new EmbedBuilder();

    pingEmbed.setColor('#36393F');
    pingEmbed.setAuthor({ name: 'Greg Project - /ping', url: 'https://github.com/ttommie/greg-project/' });
    pingEmbed.setTitle('Ping Information');
    pingEmbed.setDescription(`Bot Latency is **${Math.round(client.ws.ping)}** ms`);

    interaction.reply({ embeds: [pingEmbed] });
  },
};
