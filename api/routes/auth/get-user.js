const express = require('express');
const BadRequestError = require('../../errors/bad-request-error');

const countapi = require('countapi-js');

const User = require('../../models/user');

const router = express.Router();

router.get('/api/users/details/:username',
async (req, res) => {
    // console.log(req.currentUser);
    const { username } = req.params;
    try {
        const user = await User.findOne({username}).exec();
        if(user) {
            const result = await countapi.hit(req.headers.host, 'portfolio-' + username);
            return res.json({viewCount: result.value, user});
        }

        throw new BadRequestError('Can\'t find user...', 404);
    }
    catch(err) {
        console.log(err);
        throw new BadRequestError('Error fetching user', 404);
    }
});

module.exports = router;