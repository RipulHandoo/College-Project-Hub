const express = require("express")
const router = express.Router()
const multer = require("multer")

// 'LIMIT_PART_COUNT'
//         | 'LIMIT_FILE_SIZE'
//         | 'LIMIT_FILE_COUNT'
//         | 'LIMIT_FIELD_KEY'
//         | 'LIMIT_FIELD_VALUE'
//         | 'LIMIT_FIELD_COUNT'
//         | 'LIMIT_UNEXPECTED_FILE';

// better error handling
router.use((error,req,res,next) =>{
    if(error instanceof multer.MulterError){
        if(error == "LIMIT_PART_COUNT"){
            res.status(400).json({
                message: "Too many parts"
            })
        }else if(error == "LIMIT_FILE_SIZE"){
            res.status(400).json({
                message: "File too large"
            })
        }else if(error == "LIMIT_FILE_COUNT"){
            res.status(400).json({
                message: "Too many files"
            })
        }else if(error == "LIMIT_FIELD_KEY"){
            res.status(400).json({
                message: "Field name too long"
            })
        }else if(error == "LIMIT_FIELD_VALUE"){
            res.status(400).json({
                message: "Field value too long"
            })
        }else if(error == "LIMIT_FIELD_COUNT"){
            res.status(400).json({
                message: "Too many fields"
            })
        }else if(error == "LIMIT_UNEXPECTED_FILE"){
            res.status(400).json({
                message: "Unexpected field"
            })
        }else{
            res.status(400).json({
                message: "Unknown error"
            })
        }
    }
})
