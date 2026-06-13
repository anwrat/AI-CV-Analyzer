import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
  forcePathStyle: true,
});
const BUCKET = "cv-storage";

export async function uploadToS3(
  buffer: Buffer,
  name: string,
): Promise<string> {
  const key = `cvs/${crypto.randomUUID()}-${name}`;
  await s3.send(
    new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buffer }),
  );
  return key;
}
