const express = require("express")
const multer = require("multer")
const authentication = require("../middleware/auth")
const router = express.Router()
const PutObject = require("../s3Service/putObject")
const listObject = require("../s3Service/listUserObjects")
const createRepo = require("../s3Service/createRepo")
const ListObjects = require("../s3Service/listObjects")
const getObject = require("../s3Service/getObject")
const deleteObjectCommand = require("../s3Service/deleteObject")


const storage = multer.memoryStorage()
const uploads = multer({storage: storage, limits: {fileSize: 20000000000}})

// This route is used to put objects to the AWS S3 Bucket
router.post("/:username/:repository/uploads/", uploads.array("files", 2), async (req, res) => {
  const files = req.files; // Use req.files directly, it's an array

  try {
    const username = req.params.username;
    const repositoryName = req.params.repository;

    const result = await PutObject(`${username}/${repositoryName}`,files, req, res);
    
    res.status(201).json({
      message: "Files uploaded successfully",
      result: result
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Upload object to the user's repository without directory
router.post("/:username/uploads/", uploads.array("files", 2), async (req, res) => {
  const files = req.files; // Use req.files directly, it's an array

  try {
    const username = req.params.username;
    const repositoryName = req.params.repository;

    const result = await PutObject(`${username}/${repositoryName}`,files, req, res);
    
    res.status(201).json({
      message: "Files uploaded successfully",
      result: result
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// this is the end point when the user goes to its repository
router.get("/:username/", async(req,res) => {
  try{
    const username = req.params.username;
    const response = await ListObjects(req,res,`${username}`);
    // from here we will send the response to the front end
    res.status(200).json({
      message: "Files listed successfully",
      response: response
    });
  }
  catch(error){
    console.error("Error listing files:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
})

// this is a end point to create a repo for the user
router.post("/createRepo", async(req,res) => {
  try{
    const response = await createRepo(req,res);
    res.status(200).json({
      message: "Repository created successfully",
      response: response
    });
  }
  catch(error){
    console.error("Error creating repository:", error);
  }
});

// Route to delete the file's or folder's in user's repo
router.post("/:username/:repository/delete/*", async(req,res) => {
  try{
      // call the function to delete the object at the path
      const username = req.params.username;
      const repositoryName = req.params.repository;
      const additionalLevels = req.params[0].split("/"); // Capture additional levels as an array

      const response = await deleteObjectCommand(req,res,`${username}/${repositoryName}/${additionalLevels.join("/")}`);

      res.status(200).json({
        message:"Object deleted successfully",
        response: response
      });
  }
  catch(error){
    console.error("Error deleting file:", error);
    res.status(500).json({
      message: error
    });
  }
});

// Route for user repositories with multiple levels
router.get("/:username/:repository/*", async (req, res) => {
  try {
      const username = req.params.username;
      const repositoryName = req.params.repository;
      const additionalLevels = req.params[0].split("/"); // Capture additional levels as an array

      // Get the last part of the URL (file or directory name)
      const lastPart = additionalLevels[additionalLevels.length - 1];

      // Check if the last part contains a period (dot) to determine if it's a file
      const isFile = lastPart.includes(".");

      if (isFile) {
          // Handle the case where the last part is a file
          // You can implement logic to serve the file or perform file-related operations.
          const response = await getObject(req,res,`${username}/${repositoryName}/${additionalLevels.join("/")}`);

          res.status(200).json({
              message: "File retrieved successfully",
              response: response,
              username: username,
              repository: repositoryName,
              filename: lastPart,
          });
      } else {
          // Handle the case where the last part is a directory
          // You can implement logic to list directory contents or perform directory-related operations.
         const response = await listObject(req,res,`${username}/${repositoryName}`);

         res.status(200).json({
          message: "Files listed successfully",
          response: response
        });
      }
  } catch (error) {
      console.error("Error handling route:", error);
      res.status(500).json({
          error: "Internal server error",
      });
  }
});

module.exports = router;