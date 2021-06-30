***REMOVED***
***REMOVED***
const User = require('../../models/user');

***REMOVED***

router.get('/api/portfolio/:uid'***REMOVED*** ***REMOVED***
    const { uid } = req.params;
    const user = await User.findById(uid).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...'***REMOVED*** 404);
***REMOVED***

    res.send(user.portfolio);
***REMOVED***

***REMOVED***