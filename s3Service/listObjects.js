const { ListObjectsCommand, S3Client, HeadObjectCommand } = require("@aws-sdk/client-s3");

require("dotenv").config();

const s3Client = new S3Client({
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});

async function ListObjects(req, res, path) {
    try {
        const listCommand = new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `${path}/`
        });

        const response = await s3Client.send(listCommand);
        const objects = response.Contents;

        const repoList = [];

        for (const object of objects) {
            const key = object.Key;
            const metadataCommand = new HeadObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            });
            const metadataResponse = await s3Client.send(metadataCommand);
            const status = metadataResponse.Metadata.status;
            const repoName = key.split('/')[1]; // Extracting repo name from key
            const owner = key.split('/')[0]; // Extracting owner name from key

            // Check if the requesting user is the owner
            const isOwner = req.body.userID === owner;

            // If the requesting user is the owner or the repository is public, add to repoList
            if (isOwner || status !== "private") {
                repoList.push(repoName);
            }
        }

        return repoList;
    } catch (error) {
        console.error("Error listing files:", error);
        return [];
    }
}

module.exports = ListObjects;
