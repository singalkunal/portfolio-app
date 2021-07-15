const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const signupRouter =  require('./routes/auth/signup');
const signinRouter = require('./routes/auth/signin');
const signoutRouter = require('./routes/auth/signout');
const currentUserRouter = require('./routes/auth/current-user');
const getUserRouter = require('./routes/auth/get-user');
const updateAccountRouter = require('./routes/auth/update');

const getPortfolioRouter = require('./routes/portfolio/portfolio');
const uploadRouter = require('./routes/portfolio/upload');
const editAboutRouter = require('./routes/portfolio/about');
const experienceRouter = require('./routes/portfolio/experience');
const skillsRouter = require('./routes/portfolio/skills');

const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('trust proxy', true);


// app.use(cors());
// allows axios to make request from react app
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.REACT_APP_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
  });


app.use(cookieSession({
    signed: false, // disables encryption of jwt
    // secure: true
}));

const PORT = process.env.PORT || 3080;

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter)
app.use(currentUserRouter);
app.use(getUserRouter);
app.use(updateAccountRouter);

app.use(getPortfolioRouter);
app.use(uploadRouter);
app.use(editAboutRouter);
app.use(experienceRouter);
app.use(skillsRouter);

app.use(errorHandler)

const startUp = async () => {
    // Connect Database
    if(!process.env.MONGO_URI) {
        // Bad request error
        return console.log('Must define MONGO_URI as environment variable');
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log('Connected to databse...');

    // connect Firebase Storage
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.BUCKET_URL
    });

    // locals properties can be accessed in any middleware using req.app.locals
    app.locals.bucket = admin.storage().bucket()
    

    console.log('Connected to storage...');

    app.listen(PORT, () => {
        console.log(`Api listening on ${PORT}...`);
    })
};

startUp();