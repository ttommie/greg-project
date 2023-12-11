module.exports = async (client, interaction) => {
  if (interaction.isCommand() || interaction.isContextMenu()) {
    if (!interaction.guild) return;
    if (!client.slash.has(interaction.commandName)) return;

    const command = client.slash.get(interaction.commandName);

    try {
      if (command.permissions) {
        if (!interaction.member.permissions.has(command.permissions)) {
          return interaction.reply({ content: '⚠️ You must me a moderator to use this command!', ephemeral: true });
        }
        command.execute(client, interaction);
      }
    } catch (e) {
      client.logger.error(e);
      await interaction.reply({ content: 'An error has occured', ephemeral: true });
    }
  }
};