const mongoose = require('mongoose');

const validateSize = (arr) => arr.length <= 2;

const profileLinkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        // firebase publicUrl of file
        icon_url: {
            type: String,
            default: "",
        },
        // will be used to access file in firebase bucket
        filename: {
            type: String,
            default: ""
        }
    }
);

const portfolioSchema = new mongoose.Schema({
    about: {
            firstname: {
                type: String,
                default : '**my name here**'
            },
            lastname: {
                type: String,
                default: ""
            },
            img_url: {
                type: String,
                default: ""
            },
            desc: {
                type: String,
                default: "**my desc here**"
            },
            profile_links:[profileLinkSchema]
    },
    // maybe project or experience
    experiences: [{
        title: {
            type: String,
            required: true
        },
        brief: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        tags: [
            {
                tag: {
                    type: String,
                    required: true
                }
            }
        ],
        additional_tags: [
            {
                tag: {
                    type: String,
                    required: true
                }
            }
        ],
        img_url: {
            type: [
                {
                    type: String,
                    required: true
                }
            ],
            validate: [validateSize]
        },
        external_links: [
            {
                title: {
                    type: String,
                    required: true
                },
                link: {
                    type: String,
                    required: true
                },
                icon_url: {
                    type: String,
                    default:""
                },
                filename: {
                    type: String,
                    default: ""
                }
            }
        ]
    }],
    skills: [{
        domain: {
            type: String,
            required: true
        },
        relatedSkills: [
            {
                skill: String
            }
        ]
    }],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
},
{
    toJSON: {
        versionKey: false
    }
});

module.exports = portfolioSchema;