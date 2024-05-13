const { EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
  name: 'translate',
  description: 'Translates text into different languages.',
  usage: '$translate <message>',
  example: '$translate Hello World!',
  aliases: ['translate', 't'],
  dir: 'Information',
  permissions: [],

  async execute(client, message, args) {
    const translateEmbed = new EmbedBuilder();
    const queryText = args.join(' ');
    if (!queryText) return; // TODO: CREATE ERROR MESSSAGE

    // Translate text to english
    const translatedText = await translate(queryText, { to: 'en' });

    translateEmbed.setColor('#36393F');
    translateEmbed.setAuthor({
      name: '💬 | Greg Project - $translate',
      url: 'https://github.com/ttommie/greg-project/',
    });
    translateEmbed.addFields(
      { name: 'Orginal Text', value: `${queryText}`, inline: false },
      { name: 'English Translation', value: `${translatedText.text}`, inline: false },
    );

    message.channel.send({ embeds: [translateEmbed] });
  },
};
