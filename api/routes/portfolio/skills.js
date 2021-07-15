const express = require('express');

const BadRequestError = require('../../errors/bad-request-error');
const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const User = require('../../models/user');

const router = express.Router();

// add skill
router.post('/api/portfolio/skills',
currentUser,
RequireAuth,
async (req, res) => {
    const skill= req.body;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...')
    }

    const skills = user.portfolio.skills;
    const skill_doc = skills.create(skill);

    skills.push(skill_doc);
    await user.save()

    res.status(201).send(skill_doc._id);
});

// edit skill
router.put('/api/portfolio/skills/:skid',
currentUser,
RequireAuth,
async (req, res) => {
    const skill = req.body;
    const {skid} = req.params;

    const user = await User.findById(req.currentUser._id).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...')
    }

    var skills = user.portfolio.skills; // will be reference
    
    Object.assign(skills._id(skid), skill); // copies values from source object to target

    await user.save();

    res.sendStatus(200);
});

// delete skill
router.delete('/api/portfolio/skills/delete/:skid',
currentUser,
RequireAuth,
async (req, res) => {
    const {skid} = req.params;
    const user = await User.findById(req.currentUser._id).exec();

    if(!user) {
        throw new BadRequestError('Requested user not found...')
    }

    var skills = user.portfolio.skills; // will be reference
    
    user.portfolio.skills = skills.filter(s => s._id !== skid);

    await user.save();

    res.sendStatus(200);
});

module.exports = router;