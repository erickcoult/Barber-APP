const AWS = require('aws-sdk');


module.exports = {
    IAM_USER_KEY: process.env.IAM_USER_KEY,
    IAM_USER_SECRET: process.env.IAM_USER_SECRET,
    BUCKET_NAME: 'barber-app',
    AWS_REGION: 'us-east-2',

    uploadToS3: function (file, filename) {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;
            let AWS_REGION = this.AWS_REGION;

            let s3bucket = new AWS.S3({            // pre-connection
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                region: AWS_REGION,
            });

            var params = {
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: file.data,
            };

            s3bucket.upload(params, function (err, data) {
                if (err) {
                    console.log(err);

                    return resolve({
                        error: true,
                        message: err.message,
                    });
                }

                return resolve({
                    error: false,
                    message: data,
                });
            });
        });
    },

    deleteFileS3: function (key) {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;
            let AWS_REGION = this.AWS_REGION;

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                region: AWS_REGION,
            });

            s3bucket.deleteObject(
                {
                    Bucket: BUCKET_NAME,
                    Key: key,
                },
                function (err, data) {
                    if (err) {
                        console.log(err);

                        return resolve({
                            error: true,
                            message: err.message,
                        });
                    }

                    return resolve({
                        error: false,
                        message: data,
                    });
                }
            );
        });
    },
};