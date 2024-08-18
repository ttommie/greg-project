const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const ERR_MESSAGES = {
  // Generic
  reasonSize: 'Reason must be under 512 characters',

  // Kick
  kickSelf: 'Unable to kick self',
  kickPermDiff: 'Unable to kick a user with higher priority',

  // Ban
  banSelf: 'Unable to ban self',
  banPermDiff: 'Unable to ban a user with higher priority',
  notBannable: 'Unable to ban this user',

  // Joke
  emptyJokeRequest: 'category doesn\'t exist',
};

function CommandError(message, err) {
  const errorEmbed = new EmbedBuilder();
  errorEmbed.setColor('#36393F');
  errorEmbed.setAuthor({ name: '⛔ | Greg Project - Error', url: 'https://github.com/ttommie/greg-project/' });
  errorEmbed.setDescription(`${err}\n\n use the \`$help\` command for more info`);

  const buttonComponents = new ActionRowBuilder().addComponents(
    // TODO: SET DOC LINK
    new ButtonBuilder().setLabel('Docs').setStyle(ButtonStyle.Link).setURL('https://github.com/ttommie'),

    new ButtonBuilder()
      .setLabel('Create Issue')
      .setStyle(ButtonStyle.Link)
      .setURL('https://github.com/ttommie/greg-project/issues'),
  );

  message.channel.send({ embeds: [errorEmbed], components: [buttonComponents] });
}

function LoggerError(message) {
  this.name = this.constructor.name;
  this.message = message;
  Error.captureStackTrace(this, this.message);
}

function ChalkError(message) {
  this.name = this.constructor.name;
  this.message = message;
  Error.captureStackTrace(this, this.message);
}

module.exports = {
  ERR_MESSAGES,
  LoggerError,
  ChalkError,
  CommandError,
};
