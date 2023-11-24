import AWS from "aws-sdk";
import fs from "fs/promises";
import ffmpeg from "fluent-ffmpeg";

// Set your AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

// Specify the file and bucket details
const filePath = "path/to/your/audiofile.mp3"; // Replace with your actual file path
const bucketName = process.env.AWS_BUCKET_NAME;
const key = "destination/filename.wav"; // Optional: Set the destination key in the bucket

// Check if the file is an audio file (you might want to enhance this check)
if (!filePath.endsWith(".mp3") && !filePath.endsWith(".wav")) {
  console.log("Unsupported file format. Only MP3 and WAV files are allowed.");
} else {
  if (!filePath.endsWith(".wav")) {
    const outputFilePath = "path/to/your/converted/file.wav"; // Replace with your desired output path
    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .toFormat("wav")
        .on("end", () => resolve(outputFilePath))
        .on("error", (err) => reject(err))
        .save(outputFilePath);
    });

    // Update filePath to point to the converted WAV file
    filePath = outputFilePath;
  }

  // Read the file content using Promises
  fs.readFile(filePath)
    .then((fileContent) => {
      // Set the parameters for the S3 upload
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ACL: "public-read",
      };

      // Upload the file to S3
      return s3.upload(params).promise();
    })
    .then((data) => {
      console.log("File uploaded successfully. S3 URL:", data.Location);
    })
    .catch((err) => {
      console.error(err);
    });
}
