***REMOVED***

const replySchema = new mongoose.Schema({
    text: {
        type: String***REMOVED***
        minLenght: 1
***REMOVED******REMOVED***
    commentId: {
        type: mongoose.Schema.Types.ObjectId***REMOVED***
        required: true
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

module.exports = mongoose.model('Reply'***REMOVED*** replySchema);