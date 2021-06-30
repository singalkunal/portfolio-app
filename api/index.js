***REMOVED***
***REMOVED***
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const signupRouter =  require('./routes/auth/signup');
const signinRouter = require('./routes/auth/signin');
const currentUserRouter = require('./routes/auth/current-user');
const getUserRouter = require('./routes/auth/get-user');

const getPortfolioRouter = require('./routes/portfolio/get-portfolio');
const uploadRouter = require('./routes/portfolio/upload');
const editAboutRouter = require('./routes/portfolio/about');
const experienceRouter = require('./routes/portfolio/experience');
const skillsRouter = require('./routes/portfolio/skills');

const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false***REMOVED***);

app.set('trust proxy'***REMOVED*** true);


// app.use(cors());
// allows axios to make request from react app
app.use(function(req***REMOVED*** res***REMOVED*** next) {
    res.header('Access-Control-Allow-Origin'***REMOVED*** process.env.REACT_APP_URL);
    res.header('Access-Control-Allow-Credentials'***REMOVED*** true);
    res.header('Access-Control-Allow-Headers'***REMOVED*** 'Origin***REMOVED*** X-Requested-With***REMOVED*** Content-Type***REMOVED*** Accept');
    res.header('Access-Control-Allow-Methods'***REMOVED*** 'GET***REMOVED*** POST***REMOVED*** DELETE***REMOVED*** PUT');
    next();
  ***REMOVED***


app.use(cookieSession({
    signed: false***REMOVED*** // disables encryption of jwt
    // secure: true
***REMOVED***);

const PORT = process.env.PORT || 3080;

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(getUserRouter);

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
***REMOVED***

    await mongoose.connect(process.env.MONGO_URI***REMOVED*** {
        useNewUrlParser: true***REMOVED***
        useFindAndModify: false***REMOVED***
        useCreateIndex: true***REMOVED***
        useUnifiedTopology: true
***REMOVED***);
    console.log('Connected to databse...');

    // connect Firebase Storage
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)***REMOVED***
        storageBucket: process.env.BUCKET_URL
***REMOVED***);

    // locals properties can be accessed in any middleware using req.app.locals
    app.locals.bucket = admin.storage().bucket()
    

    console.log('Connected to storage...');

    app.listen(PORT***REMOVED*** () => {
        console.log(`Api listening on ${PORT}...`);
***REMOVED***)
};

startUp();