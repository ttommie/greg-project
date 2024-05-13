const fs = require('fs');

module.exports = async (client) => {
  fs.readdir(`${__dirname}/../slashes/`, (err, files) => {
    if (err) client.logger.error(err);
    files.forEach((dir) => {
      fs.readdir(`${__dirname}/../slashes/${dir}/`, (err, file) => {
        if (err) client.logger.error(err);
        file.forEach((f) => {
          const props = require(`${__dirname}/../slashes/${dir}/${f}`);
          client.slash.set(props.name, props);
        });

        client.logger.loader(
          `${client.color.chalkColor.yellowChalk('[SLASH]')} ${client.color.chalkColor.redChalk(
            `${dir}`,
          )} loaded with ${file.length} (/) command(s)`,
        );
      });
    });
  });
};
