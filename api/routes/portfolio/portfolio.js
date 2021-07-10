***REMOVED***

***REMOVED***
const User = require('../../models/user');


***REMOVED***
***REMOVED***

***REMOVED***

router.get('/api/portfolio/:username'***REMOVED*** ***REMOVED***
    const { username } = req.params;
    const user = await User.findOne({username***REMOVED***.exec();

    
    if(!user) {
        throw new BadRequestError('Requested user not found...'***REMOVED*** 404);
***REMOVED***

    
    res.send(user.portfolio);
***REMOVED***

router.put('/api/portfolio/edit'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const username = req.currentUser.username;
    const user = await User.findOne({username***REMOVED***.exec();

    const { portfolio } = req.body;

    if(user.portfolio.id != portfolio.id) {
        throw new BadRequestError('Can\'t update portfolio'***REMOVED*** 500);
***REMOVED***

    Object.assign(user.portfolio***REMOVED*** portfolio);

***REMOVED***
        await user.save();
***REMOVED***
    catch(err){
***REMOVED***
        throw new BadRequestError('Can\'t update portfolio'***REMOVED*** 500);
***REMOVED***

    res.status(200).send(true);

***REMOVED***

***REMOVED***