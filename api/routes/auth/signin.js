const express = require('express');
require('express-async-errors');
const { body, oneOf, check } = require('express-validator');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../../errors/bad-request-error');
const validateRequest = require('../../middlewares/validate-request');

const User = require('../../models/user');
const Password = require('../../services/password');

const router = express.Router();

router.post('/api/users/signin', 
[
    oneOf([
        check('alias')
        .exists()
        .isEmail()
        .withMessage('Not a valid email')
        .custom((value, { req }) => {
            return User.findOne({email: value}).then(user => {
                if(!user) {
                    return Promise.reject('No user found with provided email')
                }

                req.body.user = user;
            })
        })
        ,
        check('alias')
        .exists()
        .isString()
        .isLength({min: 1})
        .withMessage('Username can\'t be empty')
        .custom((value, { req }) => {
            return User.findOne({username: value}).then(user => {
                if(!user) {
                    return Promise.reject('No user found with provided username')
                }

                req.body.user = user;
            })
        })
    ],
    'Please check email/username'),
    body('password')
    .trim()
    .isLength({min: 8, max: 20})
    .withMessage('Password must be of minimum 8 characters')
],
validateRequest,
async (req, res) => {
    // const { email, password, remember } = req.body;

    // const user = await User.findOne({email});

    const { user, password, remember } = req.body;

    if(!user) {
        throw new BadRequestError("User doesn't exists", 404, 'email');
    }

    if(!user.active) {
        throw new BadRequestError('Check your email for verification...', 500);
    }

    try {
        const passwordMatch = await Password.verify(password, user.password);
        if(passwordMatch) {
            const jwtUser = jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email
            }, process.env.JWT_KEY);
            
            req.session.jwt = jwtUser;
            if(remember) req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
            return res.status(200).json({user});
        }
    }
    catch(err) {
        
    }

    throw new BadRequestError('Incorrect password', 400, 'password');
    

})

module.exports = router;