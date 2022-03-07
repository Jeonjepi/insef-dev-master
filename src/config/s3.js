const AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');
const uuid4 = require("uuid4");
const config = require('../config/config');
const {S3_UPLOAD_DIRECTORY} = require("../enums/s3.enum");

const s3 = new AWS.S3({
    accessKeyId: config.aws.s3AccessKey,
    secretAccessKey: config.aws.s3SecretKey,
    region: config.aws.s3Region,
});

const upload = multer({
    storage: multerS3({
       s3: s3,
       bucket: config.aws.s3Bucket,
       contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            let extension = path.extname(file.originalname)
            const pathName = S3_UPLOAD_DIRECTORY[file.fieldname];
            file.originalname = uuid4();
            cb(null, pathName + file.originalname+extension);
        }
    }),
})

const deleteObj = async (key) => (
    s3.deleteObject({
        Bucket: config.aws.s3Bucket, // 사용자 버켓 이름
        Key: key // 버켓 내 경로
    }).promise());
const deleteObjs = async (objects) => (
    s3.deleteObjects({
        Bucket: config.aws.s3Bucket, // 사용자 버켓 이름
        Delete: {
            Objects: objects,
            Quiet: false,
        },
    }).promise());

module.exports = {
    upload,
    deleteObj,
    deleteObjs,
};

