***REMOVED***

const secretCode = new mongoose.Schema({
//     hash: (128 bit)***REMOVED***
//     userId***REMOVED***
//     email***REMOVED***
//     password***REMOVED***
// expiresAt: Date

    code: {
        type: String***REMOVED***
        required: true***REMOVED***
***REMOVED******REMOVED***
    username: {
        type: String***REMOVED***
        required: true***REMOVED***
        unique: true
***REMOVED******REMOVED***
    email: {
        type: String***REMOVED***
        required: true***REMOVED***
        unique: true
***REMOVED******REMOVED***
    userId: {
        type: mongoose.Schema.Types.ObjectId***REMOVED***
        required: true
***REMOVED******REMOVED***
    expiresAt: {
        type: Date
***REMOVED***
***REMOVED***

secretCode.pre('save'***REMOVED*** function(next) {
    const mins = 30
    const now = new Date()
    this.expiresAt = new Date(now.getTime() + mins * 60 * 1000);
    next();
***REMOVED***

module.exports = mongoose.model('SecretCode'***REMOVED*** secretCode);