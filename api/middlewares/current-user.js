const jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
    if(req.session && req.session.jwt) {
        try {
            const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
            req.currentUser = payload;
        }
        catch(err) {
            console.log('Error verifying token...');
        }
    }
    next();
}

module.exports = currentUser;