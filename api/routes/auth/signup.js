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
    body('username')
    .trim()
    // ***REMOVED***
    // .withMessage('Please provide a username')
    .isLength({min: 1***REMOVED***
    .withMessage('Username can\'t be empty')
    .custom(async value => {
        const user = await User.findOne({username: value***REMOVED***
        if(user) {
            return Promise.reject('Username already exists');
    ***REMOVED***
***REMOVED***)***REMOVED***
    body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom(async value => {
        const user = await User.findOne({email: value***REMOVED***
        if(user) {
            return Promise.reject('Email already exists');
    ***REMOVED***
***REMOVED***)***REMOVED***
    body('password')
    .trim()
    .isLength({min: 8***REMOVED*** max: 20***REMOVED***
    .withMessage('Password must be of minimum 8 characters')
]***REMOVED***
validateRequest***REMOVED***
***REMOVED***
    console.log(req.session);
    const { username***REMOVED*** email***REMOVED*** password } = req.body;
    
    user = new User({username***REMOVED*** email***REMOVED*** password***REMOVED***
    
    await user.save();

    await SecretCode.deleteOne({username***REMOVED***
    const code = new SecretCode({
        code: randomBytes(64).toString('hex')***REMOVED***
        username***REMOVED***
        email***REMOVED***
        userId: user._id
***REMOVED***);

    await code.save();

    if(!process.env.SENDGRID_API_KEY) {
        console.log('SENDGRID_API_KEY not defined...');
        throw new BadRequestError('Can\'t send verification code...'***REMOVED*** 401);
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
            <p>Please click the link below to verify you account. Code is valid only for 30 mins </p>
            <a href = http://${req.headers.host}/api/users/verify?code=${code.code}&email=${user.email}>Verify you account</a>
        `
***REMOVED***

***REMOVED***
        await sgMail.send(msg);
        res.status(200).send(true);
***REMOVED***
***REMOVED***
        throw BadRequestError('Can\'t send verification code... Try again in some time'***REMOVED*** 500);
***REMOVED***

***REMOVED***

router.get('/api/users/verify'***REMOVED*** ***REMOVED***
    // console.log(req.query);

    const { code***REMOVED*** email } = req.query;
    const now = Date.now();

    const secretcode = await SecretCode.findOne({code***REMOVED***

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

    await SecretCode.deleteOne({code***REMOVED***
    user.active = true;
    await user.save()
    res.status(200).send('Verified');
***REMOVED***


***REMOVED***