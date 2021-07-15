***REMOVED***
const { randomBytes } = require('crypto');
const multer = require('multer');
***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
const upload = multer();

const uploadFile = async (bucket***REMOVED*** file_to_upload***REMOVED*** path) => {
    const filename = randomBytes(16).toString('hex') + '-' + file_to_upload.originalname;
    path += filename
    // const path = 'images/'+filename;
    const file = bucket.file(path);

***REMOVED***
        await file.save(file_to_upload.buffer);
        // console.log('File saved: '***REMOVED*** path)
        await file.makePublic();
    
        return {publicUrl: file.publicUrl()***REMOVED*** filename:path};
***REMOVED***
***REMOVED***
***REMOVED***
        throw new BadRequestError('Error uploading file'***REMOVED*** 500);
***REMOVED***
};

// router.post(
//     '/api/upload'***REMOVED*** 
//     ***REMOVED***
//     ***REMOVED***
//     upload.single('file')***REMOVED*** 
//     ***REMOVED***
//         const uid = req.currentUser._id;
//         var path = uid + '/' + req.body.path;
//         path = path || "images/"
//         const bucket = req.app.locals.bucket;
//         const file = req.file;

//         const response = await uploadFile(bucket***REMOVED*** file***REMOVED*** path);
//         res.send(response);
    
// ***REMOVED***

router.post(
    '/api/upload'***REMOVED*** 
    ***REMOVED***
    ***REMOVED***
    upload.array('files')***REMOVED*** 
    ***REMOVED***
        const uid = req.currentUser._id;
        var path = uid + '/' + req.body.path;
        path = path || "images/"
        const bucket = req.app.locals.bucket;
        const files = req.files;


        const responses = []

        for (let file of files) {
            const response = await uploadFile(bucket***REMOVED*** file***REMOVED*** path);
            responses.push(response);
    ***REMOVED***;

        res.send(responses);
***REMOVED***

router.post(
    '/api/delete'***REMOVED*** 
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
        const { filename } = req.body;
        const bucket = req.app.locals.bucket;

        const file = bucket.file(filename);
        const data = await file***REMOVED***;

        if(!data[0]) {
            return res.statusCode(404);
    ***REMOVED***
    ***REMOVED***
            await file.delete();
            console.log('Deleted...');
    ***REMOVED***

    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
***REMOVED***

***REMOVED***