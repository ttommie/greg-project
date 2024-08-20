const { EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

// TODO: Possibly change api for more categories (seems to only have general, programming or dad jokes)

module.exports = {
  name: 'joke',
  description: 'Replies with a Random Joke',
  usage: '$joke',
  aliases: ['joke'],
  dir: 'Fun',
  permissions: [],

  async execute(client, message, args) {
    const URL = args[0] ? `https://official-joke-api.appspot.com/jokes/${args[0]}/random` : 'https://official-joke-api.appspot.com/random_joke';
    const jokeReq = await request(URL);
    const jokeDetails = await jokeReq.body.json();

    if (jokeDetails.length === 0 && args[0]) {
      CommandError(message, `The **${args[0]}** ${ERR_MESSAGES.badCategory}`);
      return;
    }

    if (jokeDetails.length === 0) {
      CommandError(message, `${ERR_MESSAGES.emptyJokeRequest}`);
    }

    const jokeEmbed = new EmbedBuilder();
    jokeEmbed.setColor('#36393F');
    jokeEmbed.setAuthor({ name: '😂 | Greg Project - $joke', url: 'https://github.com/ttommie/greg-project/' });
    jokeEmbed.addFields(
      { name: 'Category', value:  `${args[0] ? jokeDetails[0].type : jokeDetails.type}` },
      { name: 'Setup', value:  `${args[0] ? jokeDetails[0].setup : jokeDetails.setup}` },
      { name: 'Punchline', value:  `||${args[0] ? jokeDetails[0].punchline : jokeDetails.punchline}||` },
    );

    message.channel.send({ embeds: [jokeEmbed] });
  },
};