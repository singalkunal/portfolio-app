***REMOVED***

const validateSize = (arr) => arr.length <= 2;

const profileLinkSchema = new mongoose.Schema(
    {
        title: {
            type: String***REMOVED***
            required: true
    ***REMOVED******REMOVED***
        link: {
            type: String***REMOVED***
            required: true
    ***REMOVED******REMOVED***
        // firebase publicUrl of file
        icon_url: {
            type: String***REMOVED***
            default: ""***REMOVED***
    ***REMOVED******REMOVED***
        // will be used to access file in firebase bucket
        filename: {
            type: String***REMOVED***
            default: ""
    ***REMOVED***
***REMOVED***
);

const portfolioSchema = new mongoose.Schema({
    about: {
            firstname: {
                type: String***REMOVED***
                default : '**my name her**'
***REMOVED***
            lastname: {
                type: String***REMOVED***
                default: ""
***REMOVED***
            img_url: {
                type: String***REMOVED***
                default: ""
***REMOVED***
            desc: {
                type: String***REMOVED***
                default: "**my desc here**"
***REMOVED***
            profile_links:[profileLinkSchema]
***REMOVED******REMOVED***
    // maybe project or experience
    experiences: [{
        title: {
            type: String***REMOVED***
            required: true
    ***REMOVED******REMOVED***
        brief: {
            type: String***REMOVED***
            required: true
    ***REMOVED******REMOVED***
        detail: {
            type: String***REMOVED***
            required: true
    ***REMOVED******REMOVED***
        tags: [
***REMOVED***
                tag: {
                    type: String***REMOVED***
                    required: true
***REMOVED***
***REMOVED***
        ]***REMOVED***
        additional_tags: [
***REMOVED***
                tag: {
                    type: String***REMOVED***
                    required: true
***REMOVED***
***REMOVED***
        ]***REMOVED***
        img_url: {
            type: [
    ***REMOVED***
                    type: String***REMOVED***
                    required: true
***REMOVED***
            ]***REMOVED***
            validate: [validateSize]
    ***REMOVED******REMOVED***
        external_links: [
***REMOVED***
                title: {
                    type: String***REMOVED***
                    required: true
    ***REMOVED***
                link: {
                    type: String***REMOVED***
                    required: true
    ***REMOVED***
                icon_url: {
                    type: String***REMOVED***
                    default:""
    ***REMOVED***
                filename: {
                    type: String***REMOVED***
                    default: ""
***REMOVED***
***REMOVED***
        ]
***REMOVED***]***REMOVED***
    skills: [{
        domain: {
            type: String***REMOVED***
            required: true
    ***REMOVED******REMOVED***
        relatedSkills: [
***REMOVED***
                skill: String
***REMOVED***
        ]
***REMOVED***]***REMOVED***
    post: {
        type: mongoose.Schema.Types.ObjectId***REMOVED***
        ref: 'Post'
***REMOVED******REMOVED***
}***REMOVED***
{
    toJSON: {
        versionKey: false
***REMOVED***
***REMOVED***

module.exports = portfolioSchema;