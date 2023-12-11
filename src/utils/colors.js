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
  red : 0xF52E2E,
  yellow: 0xF5F52E,
  orange: 0xF5AD2E,
  green: 0x76D813,
  cyan: 0x13D8CF,
  blue : 0x33A2FF,
  darkblue: 0x131CD8,
  purple:0x8A13D8,
  pink:0xD813D8,
  white: 0xFFFFFF,
  gray:0x9E9E9E,
  black:0x000000,
  blurple: 0x7289DA,
  greyple:0x99AAB5,
};

module.exports = {
  chalkColor,
  messageColor,
};