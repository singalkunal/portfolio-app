***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

const User = require('../../models/user');

***REMOVED***

// add skill
router.post('/api/portfolio/skills'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const skill= req.body;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...')
***REMOVED***

    const skills = user.portfolio.skills;
    const skill_doc = skills.create(skill);

    skills.push(skill_doc);
    await user.save()

    res.status(201).send(skill_doc._id);
***REMOVED***

// edit skill
router.put('/api/portfolio/skills/:skid'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const skill = req.body;
    const {skid} = req.params;

    const user = await User.findById(req.currentUser._id).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...')
***REMOVED***

    var skills = user.portfolio.skills; // will be reference
    
    Object.assign(skills._id(skid)***REMOVED*** skill); // copies values from source object to target

    await user.save();

    res.sendStatus(200);
***REMOVED***

// delete skill
router.delete('/api/portfolio/skills/delete/:skid'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    const {skid} = req.params;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...')
***REMOVED***

    var skills = user.portfolio.skills; // will be reference
    
    user.portfolio.skills = skills.filter(s => s._id !== skid);

    await user.save();

    res.sendStatus(200);
***REMOVED***

***REMOVED***