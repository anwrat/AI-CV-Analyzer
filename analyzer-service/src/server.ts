// // import app from "./app.js";
// // import config from "./config/env.config.js";

// app.listen(config.port, () => {
//   console.log(`Server is running on port ${config.port}`);
// });

import grpc from "@grpc/grpc-js";
import { grpcServer } from "./grpc/server.js";

const PORT = "0.0.0.0:50051";

grpcServer.bindAsync(
  PORT,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to start gRPC server: ", err);
      process.exit(1);
    }

    console.log(`Analyzer service running on port ${port}`);
  },
);
