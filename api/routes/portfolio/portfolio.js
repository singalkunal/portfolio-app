***REMOVED***
***REMOVED***
const User = require('../../models/user');

***REMOVED***
***REMOVED***

***REMOVED***

router.get('/api/portfolio/:uid'***REMOVED*** ***REMOVED***
    const { uid } = req.params;
    const user = await User.findById(uid).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...'***REMOVED*** 404);
***REMOVED***

    res.send(user.portfolio);
***REMOVED***

router.put('/api/portfolio/edit'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const uid = req.currentUser.id;
    const user = await User.findById(uid).exec();

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