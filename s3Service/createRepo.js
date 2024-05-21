require("dotenv").config();

const jwt = require("jsonwebtoken");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const db = require("../utils/DB.js");
const { response } = require("express");

const s3Client = new S3Client({
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});

async function createRepo(req, res) {
    try {
        // Here in try block we will just take the name of the repo store it in the aws cloud as well as in the postgres database and the name of the repo will globally be unique

        // get the information of the project folder from the request body
        const projectName = req.body.projectName;
        const projectDescription = req.body.projectDescription;
        const userID = req.body.userID;
        const techStack = req.body.techStack;
        const isPrivate = req.body.isPrivate;

        // if a folder is not created in the aws bucket with the user name then we will create the folder and also the folder with the project name the user folder will be the folder main folder where all the project will be presents and that folder will acts as a bucket for that user's project
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${userID}/${projectName}/`, // Corrected Key format
            Body: "",
            ContentType: "application/x-directory",
            // mark this a private or public
            Metadata: {
                "status": isPrivate ? "private" : "public",
            },
        });

        // console.log("Creating repository........");
        const response = await s3Client.send(command);

        // console.log("Repository created successfully..........");

        // once the project is stored in AWS S3 bucket we will store the project information in the postgres database
        try {
            const result = await db.query(
                "INSERT INTO projects (prn, repo_name, description, tech_stack, is_private) VALUES ($1, $2, $3, $4, $5)",
                [userID, projectName, projectDescription, techStack, isPrivate] // Note the INTO corrected to INTO
            );
            // console.log("Project information stored in the database:", result);
            res.status(200).json({ message: "Project created successfully: ", response}); // Send response here
        } catch (error) {
            console.error("Error storing project information in the database:", error);
            res.status(500).json({ error: "Internal server error" }); // Handle database error
        }
    } catch (error) {
        console.error("Error creating repository:", error);
        res.status(500).json({ error: "Internal server error" }); // Handle AWS S3 error
    }
}

module.exports = createRepo;
