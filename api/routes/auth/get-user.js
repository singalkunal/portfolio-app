const express = require('express');
const BadRequestError = require('../../errors/bad-request-error');

const User = require('../../models/user');

const router = express.Router();

router.get('/api/users/details/:username',
async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({username}).exec();
        if(user) {
            return res.json({ user});
        }

        throw new BadRequestError('Can\'t find user...', 404);
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Error fetching user', 404);
    }
});

module.exports = router;