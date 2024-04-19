function fileType(file){
    const fileExtension = file.originalname.split('.').pop()

    // check for image
    if(fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'png'){
        return 'image/${fileExtension}'
    }

    // check for documents and pdf
    if(fileExtension == 'pdf' || fileExtension == 'doc' || fileExtension == 'docx' || fileExtension == 'js'){
        return 'application/${fileExtension}'
    }
}

module.exports = fileType