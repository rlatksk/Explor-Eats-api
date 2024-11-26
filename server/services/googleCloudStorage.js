const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const storage = new Storage({
  keyFilename: path.join(__dirname, process.env.GOOGLE_CLOUD_KEYFILE_PATH),
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

async function uploadFile(file) {
  const { originalname, buffer } = file;
  const blob = storage.bucket(bucketName).file(originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    })
    .on('error', (err) => {
      reject(err);
    })
    .end(buffer);
  });
}

module.exports = {
  uploadFile,
};