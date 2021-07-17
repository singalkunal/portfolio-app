const express = require('express');
require('express-async-errors');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const sgMail = require('@sendgrid/mail');

const BadRequestError = require('../../errors/bad-request-error');
const validateRequest = require('../../middlewares/validate-request');

const User = require('../../models/user');
const SecretCode = require('../../models/secret-code');

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/users/signup', [
    body('username')
    .trim()
    // .exists()
    // .withMessage('Please provide a username')
    .isLength({min: 1})
    .withMessage('Username can\'t be empty')
    .custom(async value => {
        const user = await User.findOne({username: value})
        if(user) {
            return Promise.reject('Username already exists');
        }
    }),
    body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom(async value => {
        const user = await User.findOne({email: value})
        if(user) {
            return Promise.reject('Email already exists');
        }
    }),
    body('password')
    .trim()
    .isLength({min: 8, max: 20})
    .withMessage('Password must be of minimum 8 characters')
],
validateRequest,
async (req, res) => {
    const { username, email, password } = req.body;
    
    user = new User({username, email, password});
    
    await user.save();

    await SecretCode.deleteOne({username});
    const code = new SecretCode({
        code: randomBytes(64).toString('hex'),
        username,
        email,
        userId: user._id
    });

    await code.save();

    if(!process.env.SENDGRID_API_KEY) {
        
        throw new BadRequestError('Can\'t send verification code...', 401);
    }

    var base64email = Buffer.from(user.email).toString('base64');


    const msg = {
        from: {
            name: 'Portfolio App',
            email: process.env.EMAIL || 'portfolio.app@yandex.ru'
        },
        to: user.email,
        subject: 'Portfolio App - Verify your email',
        text: `
            Hello, thanks for registering with us.
            Please copy and paste below url in browser to verify your account
            http://${process.env.REACT_APP_URL}/auth/verify?code=${code.code}&email=${base64email}
        `,
        html: `
            <h1>Hello</h1>
            <p>Thanks for registering with us</p>
            <p>Please click the link below to verify your account. Code is valid only for 30 mins </p>
            <a href = http://${process.env.REACT_APP_URL}/auth/verify?code=${code.code}&email=${base64email}>Verify your account</a>
        `
    }

    try {
        await sgMail.send(msg);
        res.status(200).send(true);
    }
    catch(err) {
        await SecretCode.deleteOne({username});
        await User.deleteOne({username});
        throw BadRequestError('Can\'t send verification code... Try again in some time', 500);
        
    }

});

router.get('/api/users/verify', async (req, res) => {
    // 

    try {
            var { code, email } = req.query;
        email = Buffer.from(email, 'base64').toString('ascii');
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
        
        if(user.active) {
            return res.status(200).send('User already verifieid')
        }

        
        user.active = true;
        await user.save();
        await SecretCode.deleteOne({code});
        res.status(200).send('OK');
    }

    catch(err) {
        console.log(err);
        throw new BadRequestError("unable to verify user", 500);
    }
})


module.exports = router;