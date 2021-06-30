***REMOVED***
require('express-async-errors');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const sgMail = require('@sendgrid/mail');

***REMOVED***
***REMOVED***

const User = require('../../models/user');
const SecretCode = require('../../models/secret-code');

***REMOVED***

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/users/signup'***REMOVED*** [
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
    console.log(req.session);
    const { email***REMOVED*** password } = req.body;
    let user = await User.findOne({email***REMOVED***
    if(user) {
        throw new BadRequestError('Email already exists...'***REMOVED*** 401***REMOVED*** 'email');
***REMOVED***

    user = new User({email***REMOVED*** password***REMOVED***
    await user.save();

    const code = new SecretCode({
        code: randomBytes(64).toString('hex')***REMOVED***
        email***REMOVED***
        userId: user.id
***REMOVED***);

    await code.save();

    if(!process.env.SENDGRID_API_KEY) {
        console.log('api not set');
        throw new BadRequestError('SENDGRID_API_KEY not defined...'***REMOVED*** 401);
***REMOVED***


    const msg = {
        from: {
            name: 'Portfolio App'***REMOVED***
            email: process.env.EMAIL || 'portfolio.app@yandex.ru'
    ***REMOVED******REMOVED***
        to: user.email***REMOVED***
        subject: 'Portfolio App - Verify your email'***REMOVED***
        text: `
            Hello***REMOVED*** thanks for registering with us.
            Please copy and paste below url in browser to verify your account
            http://${req.headers.host}/api/users/verify?code=${code.code}&email=${user.email}
        `***REMOVED***
        html: `
            <h1>Hello</h1>
            <p>Thanks for registering with us</p>
            <p>Please click the link below to verify you account </p>
            <a href = http://${req.headers.host}/api/users/verify?code=${code.code}&email=${user.email}>Verify you account</a>
        `
***REMOVED***

***REMOVED***
        await sgMail.send(msg);
        res.status(200).send('Thanks for registering. Check your email for verification');
***REMOVED***
***REMOVED***
***REMOVED***
        res.status(400).send('not sent');
***REMOVED***

***REMOVED***

router.get('/api/users/verify'***REMOVED*** ***REMOVED***
    // console.log(req.query);

    const { code***REMOVED*** email } = req.query;
    const now = Date.now();

    const secretcode = await SecretCode.findOne({code***REMOVED***
    await SecretCode.deleteOne({code***REMOVED***

    if(!secretcode || secretcode.email !== email) {
        return res.status(400).send('<h1>Verification failed</h1>');
***REMOVED***

    if(secretcode.expiresAt.getTime() <= now) {
        throw new BadRequestError('Verification code exprired'***REMOVED*** 400);
***REMOVED***

    const user = await User.findById(secretcode.userId);

    if(!user) {
        return res.status(400).send('<h1>Verification failed</h1>');
***REMOVED***
    
    if(user.active) {
        return res.status(200).send('User already verifieid')
***REMOVED***
    user.active = true;
    await user.save()
    res.status(200).send('Verified');
***REMOVED***


***REMOVED***