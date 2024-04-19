const { ListObjectsCommand, S3Client } = require("@aws-sdk/client-s3")

require("dotenv").config()

const s3Client = new S3Client({
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});

async function ListObjects(req,res,path){
    try{
        const command = new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `${path}/`
        });
        const response = await s3Client.send(command);
        console.log(response);
       return response;
    }
    catch(error){
        console.error("Error listing files:", error);
    }
}

module.exports = ListObjects;