const express = require('express');

const BadRequestError = require('../../errors/bad-request-error');
const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const User = require('../../models/user');

const router = express.Router();

// add experience
router.post('/api/portfolio/experience',
currentUser,
RequireAuth,
async (req, res) => {
    const exp = req.body;
    const user = await User.findById(req.currentUser._id).exec();
    const exp_doc = user.portfolio.experiences.create(exp);
    user.portfolio.experiences.push(exp_doc);
    await user.save();
    res.status(201).send(exp_doc._id);
});

// edit experience
router.put('/api/portfolio/experience/:expid',
currentUser,
RequireAuth,
async (req, res) => {
    const exp = req.body;
    const {expid} = req.params;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user.portfolio) {
        throw new BadRequestError('Portfolio not found...')
    }

    var experiences = user.portfolio.experiences; // will be reference

    if(!experiences._id(expid)) {
        throw BadRequestError('Invalid experience _id...');
    }
    Object.assign(experiences._id(expid), exp); // copies values from source object to target

    await user.save();

    res.sendStatus(200);
});

// delete experience
router.delete('/api/portfolio/experience/delete/:expid',
currentUser,
RequireAuth,
async (req, res) => {
    const {expid} = req.params;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user.portfolio) {
        throw new BadRequestError('Portfolio not found...')
    }
    var experiences = user.portfolio.experiences; // will be reference
    
    user.portfolio.experiences = experiences.filter(e => e._id !== expid);

    await user.save();

    res.sendStatus(200);
});

module.exports = router;