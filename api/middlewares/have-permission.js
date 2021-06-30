const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');

const HavePermission = async (req***REMOVED*** res***REMOVED*** next) => {
    const userid = req.currentUser.id;
    const user = await User.findById(userid).exec();

    const {id} = req.body;
    if(!id) {
        throw new BadRequestError('Profile id not defined....'***REMOVED*** 400);
***REMOVED***
    
    if(user.profileId !== id) {
        throw new BadRequestError('Access Denied...'***REMOVED*** 403);
***REMOVED***

    next();
};

module.exports = HavePermission;