#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const commander = require("commander");
const inquirer = require("inquirer");
const checkDir = require("../utils/checkDir");
const download = require("../utils/donwload")
const unzip = require("../utils/unzip");
const { exec } = require("child_process");
const { version } = require("../package.json");
const { promptTypeList } = require("../config/promptTypeList");

commander
  .version(version, "-v, --version")
  .command("init <projectName>")
  .alias("i")
  .description(
    "Enter the project name and initialize the react component project template"
  )
  .action(async (projectName) => {
    await checkDir(path.join(process.cwd(), projectName));
    inquirer.prompt(promptTypeList).then(async (result) => {
      const { url, val } = result.type;
      console.log(
        "The template type you selected is ：" + val
      );
      await download(url,projectName);
      console.log(chalk.blue("project zip unziping..."));
      unzip(projectName);
      console.log("happy hack")
    });
  });

commander.parse(process.argv);
