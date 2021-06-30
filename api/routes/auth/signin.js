***REMOVED***
require('express-async-errors');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
***REMOVED***
***REMOVED***

const User = require('../../models/user');
const Password = require('../../services/password');

***REMOVED***

router.post('/api/users/signin'***REMOVED*** 
[
    body('email')
    .isEmail()
    .withMessage('Enter a valid email')***REMOVED***
    body('password')
    .trim()
    .isLength({min: 8***REMOVED*** max: 20***REMOVED***
    .withMessage('Password must be of minimum 8 characters')
]***REMOVED***
validateRequest***REMOVED***
***REMOVED***
    const { email***REMOVED*** password***REMOVED*** remember } = req.body;

    const user = await User.findOne({email***REMOVED***

    if(!user) {
        throw new BadRequestError("User doesn't exists"***REMOVED*** 404***REMOVED*** 'email');
***REMOVED***

***REMOVED***
        const passwordMatch = await Password.verify(password***REMOVED*** user.password);
        if(passwordMatch) {
            const jwtUser = jwt.sign({
                id: user.id***REMOVED***
                email: user.email
***REMOVED*** process.env.JWT_KEY);
            
            req.session.jwt = jwtUser;
            if(remember) req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
            // console.log(req.session);
            return res.status(200).json({jwtUser***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
        console.log('error signing in: '***REMOVED*** err);
***REMOVED***

    throw new BadRequestError('Incorrect password'***REMOVED*** 400***REMOVED*** 'password');

***REMOVED***

***REMOVED***