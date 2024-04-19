// This is the service that lists all the objects in the bucket but it is only when the user wants to see its 

require("dotenv").config()

const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3")
const jwt =  require("jsonwebtoken")

const s3Client = new S3Client({
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});

async function listUserObject(req,res,path){
    try{
        // const authToken = req.cookies.auth_token;
        // get the user name that is the folder name 
        // const decoder = jwt.verify(authToken, process.env.ACCESS_JWT_TOKEN_KEY)
        // const userID = decoder.name;
        const data = new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `${path}/`
        });

        const response = await s3Client.send(data);
        console.log(response);
        return response;
    }
    catch(error){
        console.error("Error listing files:", error);
    }
}

module.exports = listUserObject