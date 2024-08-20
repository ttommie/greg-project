const { EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

module.exports = {
  name: 'fact',
  description: 'Replies with a Random Fact',
  usage: '$fact',
  aliases: ['fact'],
  dir: 'Fun',
  permissions: [],

  async execute(client, message) {
    const URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en';
    const factReq = await request(URL);
    const factResult = await factReq.body.json();

    if (factReq.statusCode !== 200) {
      CommandError(message, ERR_MESSAGES.badRequest);
    }

    if (factResult.length === 0) {
      CommandError(message, `${ERR_MESSAGES.emptyFactRequest}`);
      return;
    }

    const factEmbed = new EmbedBuilder();
    factEmbed.setColor('#36393F');
    factEmbed.setAuthor({ name: '📚 | Greg Project - $fact', url: 'https://github.com/ttommie/greg-project/' });
    factEmbed.addFields(
      { name: 'Random Fact', value:  `${factResult.text}` },
    );

    message.channel.send({ embeds: [factEmbed] });
  },
};