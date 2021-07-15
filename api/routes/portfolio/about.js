const express = require('express');
const router = express.Router();

const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const BadRequestError = require('../../errors/bad-request-error');

const User = require('../../models/user');

router.put('/api/portfolio/edit/about',
currentUser,
RequireAuth,
async (req, res) => {
    const about = req.body;
    const user = await User.findById(req.currentUser._id).exec();
    user.portfolio.about = about;
    try{
        await user.save();
    } catch(err) {
        console.log(err);
        throw new BadRequestError('Can\'t complete request...');
    }

    res.sendStatus(200);
});

module.exports = router;