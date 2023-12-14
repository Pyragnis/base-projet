import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const AWS_ACCESS_KEY_ID = "AKIA4XITKHRTD2OIYOFL";
const AWS_SECRET_ACCESS_KEY = "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";
const AWS_REGION = "eu-west-3";
const AWS_BUCKET_NAME = "yellowfy";

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const uploadFile = async (audioBuffer, additionalData, ext) => {
  try {
    console.log(ext, "************************")
    const filename = randomName();
    console.log(filename + `.${ext}`);
    const cle = filename + `.${ext}`
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: cle,
      Body: audioBuffer.buffer,
    };

    const command = await s3.send(new PutObjectCommand(params));

    if (!command) {
      console.error("Upload command response is empty.");
      throw new Error("Failed to upload file. Please try again.");
    }

    console.log("File uploaded successfully");

    return { command, cle};
  } catch (err) {
    console.error("Error during upload:", err);
    throw err;
  }
};

const getFile = async (filepath, ext) => {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filepath,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 518400 });
    return url;
  } catch (err) {
    console.error("Error during getFile:", err);
    throw err;
  }
};

const deleteFile = async (filename) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    const response = await s3.send(command);

    return response;
  } catch (err) {
    console.error("Error during deleteFile:", err);
    throw err;
  }
};

export default {
  uploadFile,
  getFile,
  deleteFile,
};
