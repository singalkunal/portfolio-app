***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***

***REMOVED***

const User = require('../../models/user');

router.put('/api/portfolio/edit/about'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const about = req.body;
    const user = await User.findById(req.currentUser.id).exec();
    user.portfolio.about = about;
    try{
        await user.save();
***REMOVED*** catch(err) {
***REMOVED***
        throw new BadRequestError('Can\'t complete request...');
***REMOVED***

    res.sendStatus(200);
***REMOVED***

***REMOVED***