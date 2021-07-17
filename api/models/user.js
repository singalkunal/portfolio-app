const mongoose = require('mongoose');
const Password = require('../services/password');

const portfolioSchema = require('./portfolio');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    portfolio: portfolioSchema
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            // ret.id = ret._id;
            // delete ret._id;
        },

        versionKey: false
    }
});

userSchema.pre('save', async function(next) {
    if(!this.portfolio) {
        this.portfolio = {}
    }
    if(this.isModified('password') && this.password) {
        try {
            const hash = await Password.hash(this.password);
            this.set('password', hash);
        }
        catch(err) {
            console.log(err);
        }
    }
    next();
});

userSchema.methods.calcPercentageCompleted = async function() {
    const portfolio = this.portfolio;
    if(!portfolio || !portfolio.about) {
        return 0;
    }

    var num_fields_provided = 0  

    num_fields_provided += 2; // for fields which are required true

    if(portfolio.about.lastname) num_fields_provided += 1;
    if(portfolio.about.imgUrl) num_fields_provided += 1;

    num_fields_provided += Math.min(2, portfolio.about.profile_links.length) + Math.min(2, portfolio.experiences.length) +  Math.min(2, portolio.skills.length);

    return num_fields_provided * 100 / 10;
};

const User = mongoose.model('User', userSchema);

// const p = {
//     about: {
//         firstname: "test",
//         desc: "My very short desc",
//         profile_links: [
//             {
//                 title: "mylink",
//                 link: "www.google.com"
//             },
//             {
//                 title: "another one",
//                 link: "www.google.com"
//             }
//         ]
//     },

//     experiences: [
//         {
//             "title": "Hand Gesture",
//             "brief": "Flask Api to facilitate playing of 2d arcade games on mobile devices using custom gestures. Supports real time training of ml models.",
//             "detail": `

//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis felis a ex viverra convallis. Quisque lacinia nisi enim, sollicitudin dapibus ante pulvinar quis. Nunc dolor erat, iaculis non neque accumsan, tempus ornare massa. Maecenas quis ante laoreet mi commodo consectetur ut sed eros. Sed viverra quis felis quis eleifend. Fusce volutpat ipsum quis dolor dapibus, in bibendum ante convallis. Nam quis nisi vel velit auctor egestas sodales id nulla. In in ornare augue, et porttitor nunc. Sed metus felis, pellentesque id ex eget, lacinia tincidunt nunc. In placerat a urna eget maximus. Nunc ultricies facilisis nunc feugiat sagittis. Aliquam erat volutpat. Vestibulum suscipit odio sed interdum lacinia. Fusce pharetra ac nisl vel ultrices. Proin ex turpis, aliquam ut metus a, luctus porttitor augue. Integer egestas ornare risus a tincidunt.
            
//             Suspendisse hendrerit, turpis sit amet dapibus tristique, ipsum odio blandit nisl, et pulvinar nulla justo non augue. Cras diam ante, hendrerit non gravida vel, maximus at ipsum. Quisque at nunc sed urna porta sagittis ut lobortis nisl. Ut at ullamcorper ex, sed fermentum eros. Morbi sit amet odio gravida magna eleifend tincidunt. Nulla a semper eros. Sed congue libero in dui tempus, et gravida velit molestie. Etiam fringilla massa et nunc pretium tempus.
            
//             In hac habitasse platea dictumst. Duis euismod dui ut nibh gravida ultricies. Phasellus maximus ultrices arcu sed egestas. Nunc hendrerit arcu vel orci tincidunt eleifend. Nunc cursus turpis sed mauris pretium, sed finibus dolor dignissim. Integer sit amet lobortis nibh, vitae pretium nibh. Donec pharetra erat id felis fringilla facilisis. Phasellus eget egestas nunc.
            
//             Donec eros diam, pellentesque a euismod non, tincidunt sed nulla. Proin mauris leo, suscipit eu mattis ac, luctus nec metus. Donec iaculis gravida dui. Curabitur posuere sed quam a varius. Suspendisse tempor purus odio, in congue erat tempor vehicula. Aliquam porttitor eros sed ante aliquam, eu semper erat viverra. Vestibulum in malesuada massa. Pellentesque auctor quam odio, eget mattis lectus placerat ac. Morbi at tincidunt ante, non facilisis justo.
            
//             Morbi id tempus lorem. Nulla aliquet nisi lectus, sed dignissim lacus pharetra in. Donec dictum nisl in leo convallis ultricies. Curabitur faucibus sollicitudin augue vel consequat. Phasellus a nunc urna. Curabitur mollis, risus ut tristique dapibus, sapien mi porta urna, sit amet pharetra justo ligula ac nisi. Morbi rutrum elit sed ligula aliquam fermentum vitae in erat.
            
//             Nullam facilisis cursus lorem a efficitur. Nulla auctor nibh eu massa ultrices dapibus quis placerat nunc. Nullam rutrum venenatis bibendum. Donec eget mattis risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae maximus mauris. Ut rhoncus tristique suscipit. Ut convallis tempor quam non mollis. Proin tincidunt ipsum in velit tincidunt, in elementum erat ullamcorper. Nam rutrum id ante vel porta. Nam aliquam enim dolor, sed suscipit tellus porttitor quis. Morbi turpis odio, porta et fringilla et, elementum condimentum urna. Nunc tincidunt metus et lacus aliquet, eget tincidunt risus vestibulum. Vivamus elit magna, vestibulum eget volutpat in, tincidunt sit amet arcu. Donec a sem vel felis malesuada rhoncus eu at eros. In. `,
            
//             "tags": [{tag: "tag1", tag: "tag2"}],
//             "additional_tags": [{tag: "Tensorflow"}, {tag: "Some tag"}, {tag: "Try this long tag"}],
//             "img_url": [
//                 process.env.PUBLIC_URL + '/images/thumbnail.png',
//                 process.env.PUBLIC_URL + '/images/timeout.png'
//             ],
//             "external_links": [
//                 {
//                     "title": "Figma",
//                     "link": "https://www.github.com/singalkunal/HandGesture",
//                     icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb",
//                     filename: ""
//                 },
//                 {
//                     "title": "Figma",
//                     "link": "https://www.github.com/singalkunal/HandGesture",
//                     icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb",
//                     filename: ""
//                 },
//                 {
//                     "title": "Figma",
//                     "link": "https://www.github.com/singalkunal/HandGesture",
//                     icon_url: "",
//                     filename: ""
//                 }
//             ]
//         },
//         {
//             "title": "Hand Gesture",
//             "brief": "Flask Api to facilitate playing of 2d arcade games on mobile devices using custom gestures. Supports real time training of ml models.",
//             "detail": `

//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis felis a ex viverra convallis. Quisque lacinia nisi enim, sollicitudin dapibus ante pulvinar quis. Nunc dolor erat, iaculis non neque accumsan, tempus ornare massa. Maecenas quis ante laoreet mi commodo consectetur ut sed eros. Sed viverra quis felis quis eleifend. Fusce volutpat ipsum quis dolor dapibus, in bibendum ante convallis. Nam quis nisi vel velit auctor egestas sodales id nulla. In in ornare augue, et porttitor nunc. Sed metus felis, pellentesque id ex eget, lacinia tincidunt nunc. In placerat a urna eget maximus. Nunc ultricies facilisis nunc feugiat sagittis. Aliquam erat volutpat. Vestibulum suscipit odio sed interdum lacinia. Fusce pharetra ac nisl vel ultrices. Proin ex turpis, aliquam ut metus a, luctus porttitor augue. Integer egestas ornare risus a tincidunt.
            
//             Suspendisse hendrerit, turpis sit amet dapibus tristique, ipsum odio blandit nisl, et pulvinar nulla justo non augue. Cras diam ante, hendrerit non gravida vel, maximus at ipsum. Quisque at nunc sed urna porta sagittis ut lobortis nisl. Ut at ullamcorper ex, sed fermentum eros. Morbi sit amet odio gravida magna eleifend tincidunt. Nulla a semper eros. Sed congue libero in dui tempus, et gravida velit molestie. Etiam fringilla massa et nunc pretium tempus.
            
//             In hac habitasse platea dictumst. Duis euismod dui ut nibh gravida ultricies. Phasellus maximus ultrices arcu sed egestas. Nunc hendrerit arcu vel orci tincidunt eleifend. Nunc cursus turpis sed mauris pretium, sed finibus dolor dignissim. Integer sit amet lobortis nibh, vitae pretium nibh. Donec pharetra erat id felis fringilla facilisis. Phasellus eget egestas nunc.
            
//             Donec eros diam, pellentesque a euismod non, tincidunt sed nulla. Proin mauris leo, suscipit eu mattis ac, luctus nec metus. Donec iaculis gravida dui. Curabitur posuere sed quam a varius. Suspendisse tempor purus odio, in congue erat tempor vehicula. Aliquam porttitor eros sed ante aliquam, eu semper erat viverra. Vestibulum in malesuada massa. Pellentesque auctor quam odio, eget mattis lectus placerat ac. Morbi at tincidunt ante, non facilisis justo.
            
//             Morbi id tempus lorem. Nulla aliquet nisi lectus, sed dignissim lacus pharetra in. Donec dictum nisl in leo convallis ultricies. Curabitur faucibus sollicitudin augue vel consequat. Phasellus a nunc urna. Curabitur mollis, risus ut tristique dapibus, sapien mi porta urna, sit amet pharetra justo ligula ac nisi. Morbi rutrum elit sed ligula aliquam fermentum vitae in erat.
            
//             Nullam facilisis cursus lorem a efficitur. Nulla auctor nibh eu massa ultrices dapibus quis placerat nunc. Nullam rutrum venenatis bibendum. Donec eget mattis risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae maximus mauris. Ut rhoncus tristique suscipit. Ut convallis tempor quam non mollis. Proin tincidunt ipsum in velit tincidunt, in elementum erat ullamcorper. Nam rutrum id ante vel porta. Nam aliquam enim dolor, sed suscipit tellus porttitor quis. Morbi turpis odio, porta et fringilla et, elementum condimentum urna. Nunc tincidunt metus et lacus aliquet, eget tincidunt risus vestibulum. Vivamus elit magna, vestibulum eget volutpat in, tincidunt sit amet arcu. Donec a sem vel felis malesuada rhoncus eu at eros. In. `,
            
//             "tags": [{tag: "tag1", tag: "tag2"}],
//             "additional_tags": [{tag: "Tensorflow"}, {tag: "Some tag"}, {tag: "Try this long tag"}],
//             "img_url": [
//                 process.env.PUBLIC_URL + '/images/thumbnail.png',
//                 process.env.PUBLIC_URL + '/images/timeout.png'
//             ],
//             "external_links": [
//                 {
//                     "title": "Figma",
//                     "link": "https://www.github.com/singalkunal/HandGesture",
//                     icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb",
//                     filename: ""
//                 },
//                 {
//                     "title": "Figma",
//                     "link": "https://www.github.com/singalkunal/HandGesture",
//                     icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb",
//                     filename: ""
//                 },
//                 {
//                     "title": "Figma",
//                     "link": "https://www.github.com/singalkunal/HandGesture",
//                     icon_url: "",
//                     filename: ""
//                 }
//             ]
//         }
        
//     ],
//     skills: [{
//         domain: "ML",
//         relatedSkills: [
//             'My skill'
//         ]
//     }]
// }

// const u = {
//     email: "test@test.com",
//     password: "12345678",
//     portfolio: p
// }

// MONGO_URI=

// const test = async() => {
//     await mongoose.connect(MONGO_URI, {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//         useUnifiedTopology: true
//     })

//     

//     const user = new User(u);
//     
//         user.save();
// }

// test();


module.exports = User;