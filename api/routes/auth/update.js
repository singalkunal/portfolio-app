const express = require('express');
require('express-async-errors');
const { body, query, oneOf, check } = require('express-validator');

const BadRequestError = require('../../errors/bad-request-error');
const validateRequest = require('../../middlewares/validate-request');
const validator = require('validator');

const { randomBytes } = require('crypto');

const sgMail = require('@sendgrid/mail');

const SecretCode = require('../../models/secret-code');
const User = require('../../models/user');

const router = express.Router();

router.post('/api/users/forgot',
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
    'Please provide valid email or username')
],
validateRequest,
async (req, res) => {
    req.session = null;
    const { user,  } = req.body;

    if(!user) {
        throw new BadRequestError('User doesn\'t exists', 404);
    }

    // delete if any verification code existed before
    await SecretCode.deleteOne({username: user.username}).exec();

    const code = new SecretCode({
        code: randomBytes(64).toString('hex'),
        username: user.username,
        email: user.email,
        userId: user._id
    });

    await code.save();

    if(!process.env.SENDGRID_API_KEY) {
        console.log('SENDGRID_API_KEY not defined...');
        throw new BadRequestError('Can\'t send verification code...', 401);
    }

    var base64email = Buffer.from(user.email).toString('base64');
    console.log(Buffer.from(base64email, 'base64').toString('utf-8'));

    const msg = {
        from: {
            name: 'Portfolio App',
            email: process.env.EMAIL || 'portfolio.app@yandex.ru'
        },
        to: user.email,
        subject: 'Portfolio App - Reset your password',
        text: `
            Hello,
            Please copy and paste below url in browser to rest your password
            http://${process.env.REACT_APP_URL}/auth/reset?code=${code.code}&email=${base64email}
        `,
        html: `
            <h1>Hello</h1>
            <p>Please click the link below to rest your password. Code is valid only for 30 mins </p>
            <a href = http://${process.env.REACT_APP_URL}/auth/reset?code=${code.code}&email=${base64email}>Reset your password</a>
        `
    }

    try {
        await sgMail.send(msg);
        res.status(200).send(true);
    }
    catch(err) {
        throw new BadRequestError('Can\'t send verification code... Try again in some time', 500);
    }
});

router.post('/api/users/reset', 
[
    body('email')
    .exists()
    .custom((value, {req}) => {
        req.body.userEmail = Buffer.from(value, 'base64').toString('ascii');
        return true;
    }),
    body('userEmail')
    .exists()
    .isEmail()
    .withMessage('Invalid email...'),
    body('password')
    .exists()
    .isLength({min: 8})
    .withMessage('Passwrod must be of min 8 length'),
    body('code')
    .exists('Unique code doesn\'t exists' )
],
validateRequest,
async (req, res) => {
    // console.log(req.query);
    req.session = null;

    var { code, userEmail: email, password } = req.body;
    const now = Date.now();

    const secretcode = await SecretCode.findOne({code});

    if(!secretcode || secretcode.email !== email) {
        return res.status(400).send('<h1>Verification failed</h1>');
    }

    if(secretcode.expiresAt.getTime() <= now) {
        throw new BadRequestError('Verification code exprired', 400);
    }

    const user = await User.findById(secretcode.userId);
    if(!user) {
        return res.status(400).send('<h1>Verification failed</h1>');
    }

    user.active = true;
    user.password = password;

    try {
        await user.save();
    }
    catch(err) {
        console.log('====>', err);
        throw new BadRequestError('Error updating user...', 500);
    }


    await SecretCode.deleteOne({code});

    res.status(200).send('Verified');
})


module.exports = router;