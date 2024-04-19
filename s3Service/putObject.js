require("dotenv").config()

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")
const uuid = require("uuid")
const jwt = require("jsonwebtoken");
const fileType = require("../controllers/fileType");

// Get the secret access key and access id from the .env file
const s3Client = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  }
});

// this is the function that will upload the files to the s3 bucket 
async function PutObject(path,files, req, res) {
//   const authToken = req.cookies.auth_token;

//   if (!authToken) {
//     return res.status(401).json({
//       message: "Token not found"
//     });
//   }

  try {
    const projectName = "college-project-hub";
    // const decodedToken = await jwt.verify(authToken, process.env.ACCESS_JWT_TOKEN_KEY);
    // const userID = decodedToken.name; // Replace 'userId' with the actual field name in your JWT payload { Here we are passing {name: prn} as an object to the JWT token }

    // Create an array of PutObjectCommand objects for each file
    const commands = files.map((file) => {
      return new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${path}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype, // Set the Content-Type header for each file
      });
    });

    // Send all the commands to S3 concurrently and await their responses using Promise.all
    const responses = await Promise.all(commands.map((command) => s3Client.send(command)));

    responses.forEach((response, index) => {
      console.log(`File ${index + 1} uploaded successfully:`, response);
    });
    return responses;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

module.exports = PutObject;