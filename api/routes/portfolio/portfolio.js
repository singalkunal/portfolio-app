const express = require('express');

const BadRequestError = require('../../errors/bad-request-error');
const User = require('../../models/user');


const currentUser = require('../../middlewares/current-user');
const RequireAuth = require('../../middlewares/require-auth');

const router = express.Router();

router.get('/api/portfolio/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({username}).exec();

    
    if(!user) {
        throw new BadRequestError('Requested user not found...', 404);
    }

    
    res.send(user.portfolio);
});

router.put('/api/portfolio/edit',
currentUser,
RequireAuth,
async (req, res) => {
    const username = req.currentUser.username;
    const user = await User.findOne({username}).exec();

    const { portfolio } = req.body;

    if(user.portfolio._id != portfolio._id) {
        throw new BadRequestError('Can\'t update portfolio', 500);
    }

    Object.assign(user.portfolio, portfolio);

    try {
        await user.save();
    }
    catch(err){
        console.log(err);
        throw new BadRequestError('Can\'t update portfolio', 500);
    }

    res.status(200).send(true);

});


module.exports = router;