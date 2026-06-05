import path from "path";
import { extractZipFile } from "../utils/unzipper.js";

export class FileController {
  public static unzipFile = async (call: any, callback: any) => {
    try {
      const filePath = call.request.filePath;
      if (!filePath) {
        return callback({ message: "No file path provided" });
      }
      console.log("File Path from gRPC request: ", filePath);
      const fileExt = path.extname(filePath);
      if (fileExt !== ".zip") {
        return callback({
          message: "Invalid file type. Only .zip files are allowed.",
        });
      }
      const outputDir = path.join(
        path.dirname(filePath),
        path.basename(filePath, ".zip"),
      );
      await extractZipFile(filePath, outputDir);
      return callback(null, { message: "File unzipped successfully" });
    } catch (err: any) {
      console.error(err);
      callback({ message: "Error unzipping file", error: err.message });
    }
  };
}
