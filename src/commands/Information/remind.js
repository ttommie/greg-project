const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'remind',
  description: 'Set a reminder for yourself.',
  usage: '$remind <time> <message>',
  aliases: ['remind, reminder'],
  dir: 'Information',
  permissions: [],

  async execute(client, message, args) {
    const reminder = args.slice(1).join(' ');
    const time = args[0];

    if (!time) return; // TODO: CREATE ERROR
    if (!reminder) return; // TODO: CREATE ERROR

    const remindSetEmbed = new EmbedBuilder();
    remindSetEmbed.setColor('#36393F');
    remindSetEmbed.setAuthor({ name: '⌚ | Greg Project - $remind', url: 'https://github.com/ttommie/greg-project/' });
    remindSetEmbed.addFields(
      { name: 'User', value: `<@${message.author.id}>`, inline: true },
      { name: 'Remind in', value: `${time}`, inline: true },
      { name: 'Reminder', value: `\`${reminder}\``, inline: false },
    );

    TimeFormatter(time);
    message.channel.send({ embeds: [remindSetEmbed] });
  },
};

function TimeFormatter(time) {
  const regEx = /(\d*)d|(\d*)h|(\d*)m/g;
  const times = time.match(regEx);

  times.forEach((x) => {
    const timeType = x.charAt(x.length - 1);
    const count = x.slice(0, x.length - 1);
    console.log({ timeType: timeType, totalTime: count });

    // CREATE TIMER
    // SEND MESSAGE WHEN TIMER UP
  });
}
