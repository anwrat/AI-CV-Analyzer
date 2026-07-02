import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config/env.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "proto",
  "analyzer.proto",
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const analyzerPackage = protoDescriptor.analyzer;

const metadata = new grpc.Metadata();
metadata.add("api-key", config.api_key_grpc);

const client = new analyzerPackage!.AnalyzerService(
  "localhost:3000",
  grpc.credentials.createInsecure(),
);

export class AnalyzerClient {
  public static uploadAndUnzip(filePath: string) {
    return new Promise((resolve, reject) => {
      client.UploadAndUnzip({ filePath }, (err: any, response: any) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }

  public static analyzeCVs(
    jobTitle: string,
    jobDescription: string,
    requiredSkills: string[],
    experienceLevel: number,
    extraContext: string,
    fileKeys: string[],
  ) {
    return new Promise((resolve, reject) => {
      client.AnalyzeCVs(
        {
          jobTitle,
          jobDescription,
          requiredSkills,
          experienceLevel,
          extraContext,
          fileKeys,
        },
        metadata,
        (err: any, response: any) => {
          if (err) {
            return reject(err);
          }
          resolve(response);
        },
      );
    });
  }
}
