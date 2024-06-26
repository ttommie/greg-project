const fs = require('fs');

module.exports = async (client) => {
  fs.readdir(`${__dirname}/../events/`, (err, files) => {
    if (err) client.logger.error(err);
    files.forEach((file) => {
      const event = require(`${__dirname}/../events/${file}`);
      const eventName = file.split('.')[0];
      client.on(eventName, event.bind(null, client));
    });
    client.logger.loader(`${client.color.chalkColor.redChalk('[FINISH]')} ${files.length} events loaded`);
  });
};
