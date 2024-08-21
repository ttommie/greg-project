const { EmbedBuilder } = require('discord.js');
const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

module.exports = {
  name: 'magic',
  description: 'Ask a question and await your fortune to be told',
  usage: '$magic',
  aliases: ['magic', 'magicball', 'magic8', 'm8', '8ball'],
  dir: 'Fun',
  permissions: [],

  async execute(client, message, args) {
    const question = args.join(' ');

    if (!question) {
      CommandError(message, ERR_MESSAGES.emptyQuestion);
      return;
    }

    const magicEmbed = new EmbedBuilder();
    magicEmbed.setColor('#36393F');
    magicEmbed.setAuthor({ name: '🎱 | Greg Project - $magic', url: 'https://github.com/ttommie/greg-project/' });
    magicEmbed.addFields(
      { name: 'Question', value:  question },
      { name: 'Fortune', value:  `||${EightBallRes()}||` },
    );

    message.channel.send({ embeds: [magicEmbed] });
  },
};

function EightBallRes() {
  const res = [
    // Good Fortune
    'It\'s just the beginning',
    'It is decidedly so.',
    'Signs point to yes.',
    'You may rely on it.',
    'As I see it, yes.',
    'Without a doubt.',
    'Yes definitely.',
    'It is certain.',
    'Outlook good.',
    'Most likely.',
    'Yes',

    // Double Edged Fortunes
    'The answer is hiding inside you',
    'Concentrate and ask again.',
    'Better not tell you now.',
    'Reply hazy try again.',
    'Cannot predict now.',
    'Ask again later.',
    'Good Luck',
    'Hang on',
    'Maybe',

    // Bad Fortunes
    'Outlook not so good.',
    'Don\'t count on it.',
    'My sources say no.',
    'My reply is no.',
    'Very doubtful.',
    'It\'s over',
    'No way.',
    'No',
  ];

  const index = (Math.floor(Math.random() * Math.floor(res.length)));

  return res[index];
}