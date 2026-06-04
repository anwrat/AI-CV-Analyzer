import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import { FileController } from "../controllers/file.controller.js";

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

export const grpcServer = new grpc.Server();

grpcServer.addService(analyzerPackage!.AnalyzerService.service, {
  UploadAndUnzip: FileController.unzipFile,
});
