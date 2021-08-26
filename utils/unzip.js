const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

module.exports = function unzip(projectName) {
  fs.createReadStream(`${projectName}.zip`)
    .pipe(unzipper.Parse())
    .on("entry", async function (entry) {
      const fileName = entry.path;
      const type = entry.type; // 'Directory' or 'File'
      const size = entry.vars.uncompressedSize; // There is also compressedSize;
      const filePath = fileName.split("/").slice(1).join("/");
      if (!fs.existsSync(path.join(process.cwd(), `/${projectName}`))) {
        fs.mkdirSync(path.join(process.cwd(), `/${projectName}`));
      }
      if (type === "Directory") {
        if (
          !fs.existsSync(
            path.join(process.cwd(), `/${projectName}/${filePath}`)
          )
        ) {
          fs.mkdirSync(path.join(process.cwd(), `/${projectName}/${filePath}`));
        }
      }

      if (filePath !== "" && type === "File") {
        const content = await entry.buffer();
        await fs.writeFileSync(
          path.join(process.cwd(), `/${projectName}/${filePath}`),
          content
        );
      } else {
        entry.autodrain();
      }
    })
    .on("finish", ()=>fs.unlinkSync(`${projectName}.zip`));
  // .pipe(unzipper.Extract({path: projectName}))
};
