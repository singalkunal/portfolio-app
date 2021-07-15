***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
const User = require('../../models/user');

const countapi = require('countapi-js');

***REMOVED***

router.get('/api/users/currentuser'***REMOVED*** 
***REMOVED***
(req***REMOVED*** res) => {
    res.send(req.currentUser || null);
***REMOVED***

router.get('/api/users/currentuser/details'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const user = await User.findById(req.currentUser._id).exec();
    
    if(!user) {
        throw new BadRequestError('Requested user deatils can\'t be found...'***REMOVED*** 404);
***REMOVED***

***REMOVED***
        res.json({viewCount: 0***REMOVED*** user***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
        throw new BadRequestError('Server error...');
***REMOVED***


***REMOVED***

router.delete('/api/users/currentuser/delete'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
        await User.findByIdAndDelete(req.currentUser._id).exec();
        req.session = null;
        res.status(200).send(true);
***REMOVED***
***REMOVED***
***REMOVED***
        throw new BadRequestError('Error deleting user...'***REMOVED*** 500);
***REMOVED***
***REMOVED***

router.get('/api/users/opensocket'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    res.status(200).send({jwt: req.session.jwt***REMOVED***
    
***REMOVED***

***REMOVED***