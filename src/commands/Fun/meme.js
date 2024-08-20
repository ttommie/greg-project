const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

// TODO: Add errors for generating memes
// const { CommandError, ERR_MESSAGES } = require('../../utils/CustomError');

// WORKFLOW:
// User uses command w/ caption
// Grab most recent picture sent or use the image the user provided
// apply a caption to said image
// send image as a gif attachment within an embed


module.exports = {
  name: 'meme',
  description: 'Generate meme with a custom caption',
  usage: '$meme',
  aliases: ['meme'],
  dir: 'Fun',
  permissions: [],

  async execute(client, message) {
    try {
      // Get image sent by user
      const userAttach = message.attachments.first();

      // Set canvas
      const canvas = Canvas.createCanvas(userAttach.width, userAttach.height + 200);

      // set context
      const context = canvas.getContext('2d');

      // grab background from local (idea: grab last used image in chat)
      const image = await Canvas.loadImage(userAttach.proxyURL);

      // draw image using context
      context.drawImage(image, 0, 200, canvas.width, userAttach.height);

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, userAttach.width, 200);

      // setup attachment to send
      // TODO: This will be changed into using an embed
      const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

      // send attachment
      message.channel.send({ files: [attachment] });
    } catch (e) {
      console.log(e);
    }
  },
};


// // set stroke style (boarder outside of image)
// context.strokeStyle = '#0099ff';

// // add stroke to said image
// context.strokeRect(0, 0, canvas.width, canvas.height);

// // draw text ('profile' above username )
// context.font = '28px Comic Sans MS';
// context.fillStyle = '#E5E5E5';

// // render text
// context.fillText('Profile', canvas.width / 2.6, canvas.height / 3.5);

// // draw text ('username')
// context.font = '60px Comic Sans MS';

// // render text
// context.fillText(member.user.username, canvas.width / 2.5, canvas.height / 1.8);

// // draw pfp in a circle
// context.beginPath();
// context.arc(125, 125, 100, 0, Math.PI * 2, true);
// context.closePath();
// context.clip();

// // set pfp on top of image
// const { body } = await request(member.user.displayAvatarURL({ extention: 'jpg' }));
// const avatar = await Canvas.loadImage(await body.arrayBuffer());
// context.drawImage(avatar, 25, 25, 200, 200);