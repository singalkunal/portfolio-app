const jwt = require('jsonwebtoken');

const currentUser = (req***REMOVED*** res***REMOVED*** next) => {
    console.log(req.session);
    if(req.session && req.session.jwt) {
    ***REMOVED***
            const payload = jwt.verify(req.session.jwt***REMOVED*** process.env.JWT_KEY);
            req.currentUser = payload;
    ***REMOVED***
    ***REMOVED***
            console.log('Error verifying token...');
    ***REMOVED***
***REMOVED***
    next();
}

module.exports = currentUser;