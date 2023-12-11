const fs = require('fs');
module.exports = async (client) => {
  fs.readdir(`${__dirname}/../commands/`, (err, files) => {
    if (err) client.logger.error(err);
    files.forEach(dir => {
      fs.readdir(`${__dirname}/../commands/${dir}`, (err, command) => {
        if (err) client.logger.error(err);
        command.forEach(c => {
          const props = require(`${__dirname}/../commands/${dir}/${c}`);
          client.commands.set(props.name, props);
          props.aliases.forEach(alias => {
            client.aliases.set(alias, props.name);
          });
        });
        client.logger.loader(`${client.color.chalkColor.blueChalk('[PREFIX]')} ${client.color.chalkColor.magentaChalk(`${dir}`)} loaded with ${command.length} command(s)`);
      });
    });
  });
};