***REMOVED***

***REMOVED***
***REMOVED***
const User = require('../../models/user');

***REMOVED***

router.get('/api/users/currentuser'***REMOVED*** 
***REMOVED***
(req***REMOVED*** res) => {
    // console.log(req.currentUser);
    res.send(req.currentUser || null);
***REMOVED***

router.get('/api/users/currentuser/details'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const user = await User.findById(req.currentUser.id).exec();

    if(!user) {
        throw BadRequestError('Requested user deatils can\'t be found...'***REMOVED*** 404);
***REMOVED***

    res.json(user);
***REMOVED***

***REMOVED***