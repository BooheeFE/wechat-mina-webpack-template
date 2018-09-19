const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');

const spinner = ora('Downloading template...');
spinner.start();

const shell = require('shelljs');

download('BooheeFE/wechat-mina-template#master', './src', (err) => {
  if (err) {
    console.log(chalk.red(err));
    process.exit();
  }

  shell.ls('src/**/*.wxss').forEach(function(file) {
    let fileName = file.slice(0, -5);
    shell.mv(file, `${fileName}.scss`);
  });

  spinner.stop();
  console.log(chalk.green('Upgrade template successfully!'));
});