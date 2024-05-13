const { ChalkError } = require('./CustomError');
const chalk = require('chalk');

const chalkColor = {
  redChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.red(msg);
  },

  greenChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.green(msg);
  },

  blueChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.blue(msg);
  },

  yellowChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.yellow(msg);
  },

  blackChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.black(msg);
  },

  magentaChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.magenta(msg);
  },

  cyanChalk(msg) {
    if (!msg) throw new ChalkError('No message found!');
    return chalk.cyanBright(msg);
  },
};

const messageColor = {
  red: 0xf52e2e,
  yellow: 0xf5f52e,
  orange: 0xf5ad2e,
  green: 0x76d813,
  cyan: 0x13d8cf,
  blue: 0x33a2ff,
  darkblue: 0x131cd8,
  purple: 0x8a13d8,
  pink: 0xd813d8,
  white: 0xffffff,
  gray: 0x9e9e9e,
  black: 0x000000,
  blurple: 0x7289da,
  greyple: 0x99aab5,
};

module.exports = {
  chalkColor,
  messageColor,
};
