const express = require('express');
const { randomBytes } = require('crypto');
const multer = require('multer');
const BadRequestError = require('../../errors/bad-request-error');
const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const router = express.Router();
const upload = multer();

const uploadFile = async (bucket, file_to_upload, path) => {
    const filename = randomBytes(16).toString('hex') + '-' + file_to_upload.originalname;
    path += filename
    // const path = 'images/'+filename;
    const file = bucket.file(path);

    try {
        await file.save(file_to_upload.buffer);
        await file.makePublic();
    
        return {publicUrl: file.publicUrl(), filename:path};
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Error uploading file', 500);
    }
};

// router.post(
//     '/api/upload', 
//     currentUser,
//     RequireAuth,
//     upload.single('file'), 
//     async (req, res) => {
//         const uid = req.currentUser._id;
//         var path = uid + '/' + req.body.path;
//         path = path || "images/"
//         const bucket = req.app.locals.bucket;
//         const file = req.file;

//         const response = await uploadFile(bucket, file, path);
//         res.send(response);
    
// });

router.post(
    '/api/upload', 
    currentUser,
    RequireAuth,
    upload.array('files'), 
    async (req, res) => {
        const uid = req.currentUser._id;
        var path = uid + '/' + req.body.path;
        path = path || "images/"
        const bucket = req.app.locals.bucket;
        const files = req.files;


        const responses = []

        for (let file of files) {
            const response = await uploadFile(bucket, file, path);
            responses.push(response);
        };

        res.send(responses);
});

router.post(
    '/api/delete', 
    currentUser,
    RequireAuth,
    async (req, res) => {
        const { filename } = req.body;
        const bucket = req.app.locals.bucket;

        const file = bucket.file(filename);
        const data = await file.exists();

        if(!data[0]) {
            return res.statusCode(404);
        }
        try {
            await file.delete();
        }

        catch(err) {
            console.log(err);
        }
})

module.exports = router;