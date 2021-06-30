***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
const User = require('../../models/user');

***REMOVED***

router.get('/api/users/details/:uid'***REMOVED***
***REMOVED***
    // console.log(req.currentUser);
    const { uid } = req.params;
***REMOVED***
        const user = await User.findById(uid).exec();
        res.json(user);
***REMOVED***
***REMOVED***
***REMOVED***
        throw BadRequestError('Error fetching user'***REMOVED*** 404);
***REMOVED***
***REMOVED***

***REMOVED***