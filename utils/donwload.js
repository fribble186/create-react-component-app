const fs = require("fs");
const path = require("path");
const Axios = require("axios");
const chalk = require("chalk");

module.exports = async function download(url, projectName) {
  console.log(chalk.blue("project zip downloading..."));
  const writer = fs.createWriteStream(
    path.join(process.cwd(), `${projectName}.zip`)
  );
  const response = await Axios({
    url,
    responseType: "stream",
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", () => {
      console.log(chalk.blue("download success"));
      resolve();
    });
    writer.on("error", reject);
  });
};
