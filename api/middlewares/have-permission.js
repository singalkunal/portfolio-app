const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');

const HavePermission = async (req, res, next) => {
    const userid = req.currentUser.id;
    const user = await User.findById(userid).exec();

    const {id} = req.body;
    if(!id) {
        throw new BadRequestError('Profile id not defined....', 400);
    }
    
    if(user.profileId !== id) {
        throw new BadRequestError('Access Denied...', 403);
    }

    next();
};

module.exports = HavePermission;