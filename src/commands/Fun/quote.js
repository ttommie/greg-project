const { EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

module.exports = {
  name: 'quote',
  description: 'Replies with a Random Quote',
  usage: '$quote',
  aliases: ['quote'],
  dir: 'Fun',
  permissions: [],

  async execute(client, message) {
    const URL = 'https://zenquotes.io/api/quotes';
    const quoteReq = await request(URL);
    const quoteResult = await quoteReq.body.json();

    if (quoteReq.statusCode !== 200) {
      CommandError(message, ERR_MESSAGES.badRequest);
    }

    if (quoteResult.length === 0) {
      CommandError(message, `${ERR_MESSAGES.emptyQuoteRequest}`);
      return;
    }

    const quoteEmbed = new EmbedBuilder();
    quoteEmbed.setColor('#36393F');
    quoteEmbed.setAuthor({ name: '📖 | Greg Project - $quote', url: 'https://github.com/ttommie/greg-project/' });
    quoteEmbed.addFields(
      { name: 'Quote', value:  `${quoteResult[0].q}` },
      { name: 'Author', value:  `${quoteResult[0].a}` },
    );

    message.channel.send({ embeds: [quoteEmbed] });
  },
};