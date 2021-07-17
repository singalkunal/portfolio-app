const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');

const admin = require('firebase-admin');

const registerCommunity = require('./events/community');
const registerCommentEvents = require('./events/comment');
const registerPostEvents = require('./events/post');


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

const postRouter = require('./routes/community/post');
const commentRouter = require('./routes/community/comment');

const errorHandler = require('./middlewares/error-handler');

const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('trust proxy', true);

const server = require('http').createServer(app);
const io = require('./services/socket').init(server);

// app.use(cors());
// allows axios to make request from react app
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.REACT_APP_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
  });


const session = cookieSession({
    signed: false, // disables encryption of jwt
    // secure: true
});
app.use(session);

const PORT = process.env.PORT || 3080;


// wrapper to map express middlewares to socket.io middleware
const wrap = middleware => (socket, next) => {
    middleware(socket.request, {}, next);
};

// io.use(wrap(session));

io.on('connection', socket => {
    

    registerCommunity(io, socket);
    registerCommentEvents(io, socket);
    registerPostEvents(io, socket);

    socket.on('disconnect', () => {
        socket.request.currentUser = null; 
        
    });
});


io.use((socket, next) => {
    if(socket.handshake.auth.jwt) {

        try{
            socket.request.currentUser = jwt.verify(socket.handshake.auth.jwt, process.env.JWT_KEY);
            next();
        }
        catch(err) {
            // console.log(err);
            next(new Error('unable to verify...'))
        }
    }

    else {
        next(new Error('Unable to authorize user...'));
    }

});


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

app.use(postRouter);
app.use(commentRouter);

app.use(errorHandler)

const startUp = async () => {
    // Connect Database
    if(!process.env.MONGO_URI) {
        // Bad request error
        return console.log('MONGO_URI not provided');
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    

    const {
        type,
        project_id,
        private_key_id,
        private_key,
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url
    } = process.env;

    // connect Firebase Storage
    admin.initializeApp({
        credential: admin.credential.cert({
        type,
        project_id,
        private_key_id,
        private_key,
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url
    }),
        storageBucket: process.env.BUCKET_URL
    });

    // locals properties can be accessed in any middleware using req.app.locals
    app.locals.bucket = admin.storage().bucket()
    

    

    server.listen(PORT, () => {
        
    })
};

startUp();
