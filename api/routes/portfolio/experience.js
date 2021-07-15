***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

const User = require('../../models/user');

***REMOVED***

// add experience
router.post('/api/portfolio/experience'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const exp = req.body;
    // console.log(exp);
    const user = await User.findById(req.currentUser._id).exec();
    const exp_doc = user.portfolio.experiences.create(exp);
    user.portfolio.experiences.push(exp_doc);
    await user.save();
    res.status(201).send(exp_doc._id);
***REMOVED***

// edit experience
router.put('/api/portfolio/experience/:expid'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const exp = req.body;
    const {expid} = req.params;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user.portfolio) {
        throw new BadRequestError('Portfolio not found...')
***REMOVED***

    var experiences = user.portfolio.experiences; // will be reference

    if(!experiences._id(expid)) {
        throw BadRequestError('Invalid experience _id...');
***REMOVED***
    Object.assign(experiences._id(expid)***REMOVED*** exp); // copies values from source object to target

    await user.save();

    res.sendStatus(200);
***REMOVED***

// delete experience
router.delete('/api/portfolio/experience/delete/:expid'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const {expid} = req.params;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user.portfolio) {
        throw new BadRequestError('Portfolio not found...')
***REMOVED***
    var experiences = user.portfolio.experiences; // will be reference
    
    user.portfolio.experiences = experiences.filter(e => e._id !== expid);

    await user.save();

    res.sendStatus(200);
***REMOVED***

***REMOVED***