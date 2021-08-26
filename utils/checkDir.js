const fs = require("fs");
const chalk = require("chalk");

module.exports = function (projectDir) {
  let isExisted = fs.existsSync(projectDir);
  if (isExisted) {
    console.log(chalk.red(`The project direction is already existed.`));
    process.exit(1);
  }
};
