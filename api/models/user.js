***REMOVED***
const Password = require('../services/password');

const portfolioSchema = require('./portfolio');

const userSchema = new mongoose.Schema({
    email: {
        type: String***REMOVED***
        required: true
***REMOVED******REMOVED***
    password: {
        type: String
***REMOVED******REMOVED***
    active: {
        type: Boolean***REMOVED***
        default: false
***REMOVED******REMOVED***
    portfolio: portfolioSchema
}***REMOVED*** {
    toJSON: {
        transform(doc***REMOVED*** ret) {
            delete ret.password;
            ret.id = ret._id;
            delete ret._id;
    ***REMOVED******REMOVED***

        versionKey: false
***REMOVED***
***REMOVED***

userSchema.pre('save'***REMOVED*** async function(next) {
    if(!this.portfolio) {
        this.portfolio = {}
***REMOVED***
    if(this.isModified('password') && this.password) {
    ***REMOVED***
            const hash = await Password.hash(this.password);
            this.set('password'***REMOVED*** hash);
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
***REMOVED***
    next();
***REMOVED***

userSchema.methods.calcPercentageCompleted = async function() {
    const portfolio = this.portfolio;
    if(!portfolio || !portfolio.about) {
        return 0;
***REMOVED***

    console.log(portfolio);
    var num_fields_provided = 0  

    num_fields_provided += 2; // for fields which are required true

    if(portfolio.about.lastname) num_fields_provided += 1;
    if(portfolio.about.imgUrl) num_fields_provided += 1;

    num_fields_provided += Math.min(2***REMOVED*** portfolio.about.profileLinks.length) + Math.min(2***REMOVED*** portfolio.experiences.length) +  Math.min(2***REMOVED*** portolio.skills.length);

    return num_fields_provided * 100 / 10;
};

const User = mongoose.model('User'***REMOVED*** userSchema);

start();

user.save();

module.exports = User;