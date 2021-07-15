***REMOVED***
require('express-async-errors');
const { body***REMOVED*** oneOf***REMOVED*** check } = require('express-validator');
const jwt = require('jsonwebtoken');
***REMOVED***
***REMOVED***

const User = require('../../models/user');
const Password = require('../../services/password');

***REMOVED***

router.post('/api/users/signin'***REMOVED*** 
[
    oneOf([
        check('alias')
        ***REMOVED***
        .isEmail()
        .withMessage('Not a valid email')
        ***REMOVED***
            return User.findOne({email: value***REMOVED***.then(user => {
                if(!user) {
                    return Promise.reject('No user found with provided email')
***REMOVED***

                req.body.user = user;
***REMOVED***)
    ***REMOVED***)
        ***REMOVED***
        check('alias')
        ***REMOVED***
        .isString()
        .isLength({min: 1***REMOVED***
        .withMessage('Username can\'t be empty')
        ***REMOVED***
            return User.findOne({username: value***REMOVED***.then(user => {
                if(!user) {
                    return Promise.reject('No user found with provided username')
***REMOVED***

                req.body.user = user;
***REMOVED***)
    ***REMOVED***)
    ]***REMOVED***
    'Please check email/username')***REMOVED***
    body('password')
    .trim()
    .isLength({min: 8***REMOVED*** max: 20***REMOVED***
    .withMessage('Password must be of minimum 8 characters')
]***REMOVED***
validateRequest***REMOVED***
***REMOVED***
    // const { email***REMOVED*** password***REMOVED*** remember } = req.body;

    // const user = await User.findOne({email***REMOVED***

    const { user***REMOVED*** password***REMOVED*** remember } = req.body;

    if(!user) {
        throw new BadRequestError("User doesn't exists"***REMOVED*** 404***REMOVED*** 'email');
***REMOVED***

    if(!user.active) {
        throw new BadRequestError('Check your email for verification...'***REMOVED*** 500);
***REMOVED***

***REMOVED***
        const passwordMatch = await Password.verify(password***REMOVED*** user.password);
        if(passwordMatch) {
            const jwtUser = jwt.sign({
                _id: user._id***REMOVED***
                username: user.username***REMOVED***
                email: user.email
***REMOVED*** process.env.JWT_KEY);
            
            req.session.jwt = jwtUser;
            if(remember) req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
            // console.log(req.session);
            return res.status(200).json({user***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
        console.log('error signing in: '***REMOVED*** err);
***REMOVED***

    throw new BadRequestError('Incorrect password'***REMOVED*** 400***REMOVED*** 'password');
    

***REMOVED***

***REMOVED***