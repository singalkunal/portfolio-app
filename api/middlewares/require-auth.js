***REMOVED***
const BadRequestError  = require('../errors/bad-request-error');

const RequireAuth = (req***REMOVED*** res***REMOVED*** next) => {
    // console.log('req-auth middleware:'***REMOVED*** req.cookies***REMOVED*** req.session***REMOVED*** req.signedCookies);
    if(!req.currentUser) {
        throw new BadRequestError('Not authorized...'***REMOVED*** 403);
***REMOVED***
    next();
};

module.exports = RequireAuth;