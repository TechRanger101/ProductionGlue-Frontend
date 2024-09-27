import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_AUTH_AWS_REGION || "",
  credentials: {
    accessKeyId:
      process.env.NEXT_AUTH_AWS_ACCESS_KEY_ID || "",
    secretAccessKey:
      process.env.NEXT_AUTH_AWS_SECRET_ACCESS_KEY ||
      "",
  },
});

async function uploadFileToS3(file: any, fileName: any) {
  const fileBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "",
    Key: Date.now() + `${fileName}`,
    Body: fileBuffer,
  };
  // console.log(params);

  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  if (data.$metadata.httpStatusCode !== 200) {
    return "";
  }
  // console.log(data," data",command);
  return command.input.Key;
}

async function deleteFromS3(fileName: any) {
  //  console.log(fileName, " fileName");
  //  console.log(fileName[0].split("/")[3], " fileName?.split(/)");
  const fileNameToBeDeleted = fileName[0].split("/")[3];
  // console.log(fileNameToBeDeleted, " fileNameToBeDeleted");
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "",
    Key: fileNameToBeDeleted,
  };
  // console.log(params);

  const command = new DeleteObjectCommand(params);
  const data = await s3Client.send(command);
  if (data.$metadata.httpStatusCode !== 200) {
    return "";
  }
  console.log(data, " delete s3 data", command);
  return command.input.Key;
}

export { uploadFileToS3, deleteFromS3 };
