***REMOVED***

const postSchema = new mongoose.Schema({
    user: {   // this will contain post (portfolio)
        type: mongoose.Schema.Types.ObjectId***REMOVED*** 
        ref: 'User'
***REMOVED******REMOVED***
    likesCount: {
        type: Number***REMOVED***
        default: 0
***REMOVED******REMOVED***
    likes: [{
        type: mongoose.Schema.Types.ObjectId***REMOVED***
        ref: 'User'
***REMOVED***]***REMOVED***
    commentsCount: {
        type: Number***REMOVED***
        default: 0
***REMOVED******REMOVED***
    comments: [{
        type: mongoose.Schema.Types.ObjectId***REMOVED***
        ref: 'Comment'
***REMOVED***]***REMOVED***

    createdAt: Number***REMOVED***
    updatedAt: Number***REMOVED***
}***REMOVED***
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}***REMOVED***
{
    toJSON: {
        versionKey: false
***REMOVED***
***REMOVED***

module.exports = mongoose.model('Post'***REMOVED*** postSchema);
