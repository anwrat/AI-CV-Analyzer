//Using the unzip-stream library
import fs from "fs";
import unzipper from "unzip-stream";
import path from "path";

export const extractZipFile = (filePath: string, outputDir: string) => {
  // fs.createReadStream(filePath).pipe(unzipper.Extract({ path: outputDir }));
  fs.createReadStream(filePath)
    .pipe(unzipper.Parse())
    .on("entry", function (entry) {
      const fileName = entry.path;
      const type = entry.type;
      if (type === "File" && /\.pdf$/i.test(fileName)) {
        const targetPath = path.join(outputDir, fileName);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        entry.pipe(fs.createWriteStream(targetPath));
      } else {
        entry.autodrain();
      }
    });
};
