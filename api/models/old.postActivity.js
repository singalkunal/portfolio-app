***REMOVED***

const postActivitySchema = new mongoose.Schema({
    postId: { // will be userId
        type: mongoose.Schema.Types.ObjectId***REMOVED***
        ref: 'User'
***REMOVED******REMOVED***
    likes: {
        type: Number***REMOVED***
        default: 0
***REMOVED******REMOVED***
    comments: {
        type: Number***REMOVED***
        default: 0
***REMOVED******REMOVED***
    views: {
        type: Number***REMOVED***
        default: 0
***REMOVED******REMOVED***
    createdAt: Number***REMOVED***
    updatedAt: Number
}***REMOVED***
{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}***REMOVED***
{
    toJSON: {
        transform(doc***REMOVED*** ret) {
            delete ret.password;
            ret.id = ret._id;
            delete ret._id;
    ***REMOVED******REMOVED***

        versionKey: false
***REMOVED***
***REMOVED***

module.exports = mongoose.model('PostActivity'***REMOVED*** postActivitySchema);