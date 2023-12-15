// const { Collection } = require('discord.js');

module.exports = async (client, message) => {
  if (message.author.bot) return;
  const prefix = client.config.PREFIX;

  if (!message.content.startsWith(prefix)) return;

  const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
  const args = message.content.split(' ').slice(1);
  let cmd;

  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  const props = require(`../commands/${cmd.dir}/${cmd.name}`);

  // TODO: COOLDOWN / PERM CHECKS

  if (props.permissions) {
    if (!message.member.permissions.has(props.permissions)) {
      return message.reply('⚠️ You must be a moderator to use this command!');
    }
  }

  cmd.execute(client, message, args).catch(err => client.emit('An error has occurred!', err, message));
};