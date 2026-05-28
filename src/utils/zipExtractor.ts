import fs from "fs";
import unzipper from "unzip-stream";

export const extractZipFile = (filePath: string, outputDir: string) => {
  fs.createReadStream(filePath).pipe(unzipper.Extract({ path: outputDir }));
};
