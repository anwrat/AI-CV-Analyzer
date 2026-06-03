import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "proto",
  "analyzer.proto",
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const analyzerPackage = protoDescriptor.analyzer;
