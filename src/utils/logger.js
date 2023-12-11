const chalk = require('chalk');
const moment = require('moment');
const { LoggerError } = require('./CustomError');
const timestamp = `[${moment().format(' HH:mm:ss | DD-MM-YYYY ')}]`;

function loader(content) {
  if (!content) throw new LoggerError('No message found!');
  console.log(`${chalk.cyan(timestamp)} ${chalk.green.underline(('[LOADER]'))} ${content}`);
}

function error(content) {
  if (!content) throw new LoggerError('No message found!');
  console.log(`${chalk.cyan(timestamp)} ${chalk.red.underline(('[ERROR]'))} ${content}`);
}

function info(content) {
  if (!content) throw new LoggerError('No message found!');
  console.log(`${chalk.cyan(timestamp)} ${chalk.magenta.underline(('[INFO]'))} ${content}`);
}

module.exports = {
  loader,
  error,
  info,
};