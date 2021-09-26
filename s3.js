import S3 from 'aws-sdk/clients/s3.js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const bucketName = process.env.aws_bucket_name
const region = process.env.aws_bucket_region
const accesskey = process.env.AWS_ACCESS_KEY_ID
const secret_key = process.env.AWS_SECRET_ACCESS_KEY
// console.log(bucketName,
//     region,
//     accesskey,
//     secret_key)

const s3 = new S3({
    region,
    accesskey,
    secret_key,
    bucketName
});


// Uploads the o s3
export const uploadFile = (file) =>
{
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
};


// download a file from s3
export const getFileStream = (fileKey) =>
{
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }
    return s3.getObject(downloadParams).createReadStream()
};

export default { uploadFile, getFileStream }