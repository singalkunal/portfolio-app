***REMOVED***
***REMOVED***

const countapi = require('countapi-js');

const User = require('../../models/user');

***REMOVED***

router.get('/api/users/details/:username'***REMOVED***
***REMOVED***
    // console.log(req.currentUser);
    const { username } = req.params;
***REMOVED***
        const user = await User.findOne({username***REMOVED***.exec();
        if(user) {
            const result = await countapi.hit(req.headers.host***REMOVED*** 'portfolio-' + username);
            return res.json({viewCount: result.value***REMOVED*** user***REMOVED***
    ***REMOVED***

        throw new BadRequestError('Can\'t find user...'***REMOVED*** 404);
***REMOVED***
***REMOVED***
***REMOVED***
        throw new BadRequestError('Error fetching user'***REMOVED*** 404);
***REMOVED***
***REMOVED***

***REMOVED***