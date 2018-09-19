const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');

const spinner = ora('Downloading template...');
spinner.start();

download('BooheeFE/wechat-mina-template#master', './src', (err) => {
  if (err) {
    console.log(chalk.red(err));
    process.exit();
  }
  spinner.stop();
  console.log(chalk.green('Update template successfully!'));
});