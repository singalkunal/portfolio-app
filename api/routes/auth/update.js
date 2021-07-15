***REMOVED***
require('express-async-errors');
const { body***REMOVED*** query***REMOVED*** oneOf***REMOVED*** check } = require('express-validator');

***REMOVED***
***REMOVED***
const validator = require('validator');

const { randomBytes } = require('crypto');

const sgMail = require('@sendgrid/mail');

const SecretCode = require('../../models/secret-code');
const User = require('../../models/user');

***REMOVED***

router.post('/api/users/forgot'***REMOVED***
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
    'Please provide valid email or username')
]***REMOVED***
validateRequest***REMOVED***
***REMOVED***
    req.session = null;
    const { user***REMOVED***  } = req.body;

    if(!user) {
        throw new BadRequestError('User doesn\'t exists'***REMOVED*** 404);
***REMOVED***

    // delete if any verification code existed before
    await SecretCode.deleteOne({username: user.username***REMOVED***.exec();

    const code = new SecretCode({
        code: randomBytes(64).toString('hex')***REMOVED***
        username: user.username***REMOVED***
        email: user.email***REMOVED***
        userId: user._id
***REMOVED***);

    await code.save();

    if(!process.env.SENDGRID_API_KEY) {
        console.log('SENDGRID_API_KEY not defined...');
        throw new BadRequestError('Can\'t send verification code...'***REMOVED*** 401);
***REMOVED***

    var base64email = Buffer.from(user.email).toString('base64');
    console.log(Buffer.from(base64email***REMOVED*** 'base64').toString('utf-8'));

    const msg = {
        from: {
            name: 'Portfolio App'***REMOVED***
            email: process.env.EMAIL || 'portfolio.app@yandex.ru'
    ***REMOVED******REMOVED***
        to: user.email***REMOVED***
        subject: 'Portfolio App - Reset your password'***REMOVED***
        text: `
            Hello***REMOVED***
            Please copy and paste below url in browser to rest your password
            http://${process.env.REACT_APP_URL}/auth/reset?code=${code.code}&email=${base64email}
        `***REMOVED***
        html: `
            <h1>Hello</h1>
            <p>Please click the link below to rest your password. Code is valid only for 30 mins </p>
            <a href = http://${process.env.REACT_APP_URL}/auth/reset?code=${code.code}&email=${base64email}>Reset your password</a>
        `
***REMOVED***

***REMOVED***
        await sgMail.send(msg);
        res.status(200).send(true);
***REMOVED***
***REMOVED***
        throw new BadRequestError('Can\'t send verification code... Try again in some time'***REMOVED*** 500);
***REMOVED***
***REMOVED***

router.post('/api/users/reset'***REMOVED*** 
[
    body('email')
    ***REMOVED***
    .custom((value***REMOVED*** {req***REMOVED*** => {
        req.body.userEmail = Buffer.from(value***REMOVED*** 'base64').toString('ascii');
        return true;
***REMOVED***)***REMOVED***
    body('userEmail')
    ***REMOVED***
    .isEmail()
    .withMessage('Invalid email...')***REMOVED***
    body('password')
    ***REMOVED***
    .isLength({min: 8***REMOVED***
    .withMessage('Passwrod must be of min 8 length')***REMOVED***
    body('code')
    .exists('Unique code doesn\'t exists' )
]***REMOVED***
validateRequest***REMOVED***
***REMOVED***
    // console.log(req.query);
    req.session = null;

    var { code***REMOVED*** userEmail: email***REMOVED*** password } = req.body;
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

    user.active = true;
    user.password = password;

***REMOVED***
        await user.save();
***REMOVED***
***REMOVED***
        console.log('====>'***REMOVED*** err);
        throw new BadRequestError('Error updating user...'***REMOVED*** 500);
***REMOVED***


    await SecretCode.deleteOne({code***REMOVED***

    res.status(200).send('Verified');
***REMOVED***


***REMOVED***