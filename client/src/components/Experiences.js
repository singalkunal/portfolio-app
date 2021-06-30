import { useState } from 'react';
import '../css/Experiences.css';
import Experience from './Experience';

const Experiences = ({ experiences***REMOVED*** editMode=false ***REMOVED*** => {
    console.log(experiences)
    const bgColors =  ['#283250'***REMOVED*** '#174954'***REMOVED*** '#214656'***REMOVED*** '#6E8695'***REMOVED*** '#252323'***REMOVED*** '#462025'***REMOVED*** '#A39C8F'***REMOVED*** '#70798C'];
    const [faceClass***REMOVED*** _] = useState(['face-right'***REMOVED*** 'face-left']);

    const experiencesDummy = [
***REMOVED***
            "title": "Hand Gesture"***REMOVED***
            "brief": "Flask Api to facilitate playing of 2d arcade games on mobile devices using custom gestures. Supports real time training of ml models."***REMOVED***
            "detail": `

            Lorem ipsum dolor sit amet***REMOVED*** consectetur adipiscing elit. Proin venenatis felis a ex viverra convallis. Quisque lacinia nisi enim***REMOVED*** sollicitudin dapibus ante pulvinar quis. Nunc dolor erat***REMOVED*** iaculis non neque accumsan***REMOVED*** tempus ornare massa. Maecenas quis ante laoreet mi commodo consectetur ut sed eros. Sed viverra quis felis quis eleifend. Fusce volutpat ipsum quis dolor dapibus***REMOVED*** in bibendum ante convallis. Nam quis nisi vel velit auctor egestas sodales id nulla. In in ornare augue***REMOVED*** et porttitor nunc. Sed metus felis***REMOVED*** pellentesque id ex eget***REMOVED*** lacinia tincidunt nunc. In placerat a urna eget maximus. Nunc ultricies facilisis nunc feugiat sagittis. Aliquam erat volutpat. Vestibulum suscipit odio sed interdum lacinia. Fusce pharetra ac nisl vel ultrices. Proin ex turpis***REMOVED*** aliquam ut metus a***REMOVED*** luctus porttitor augue. Integer egestas ornare risus a tincidunt.
            
            Suspendisse hendrerit***REMOVED*** turpis sit amet dapibus tristique***REMOVED*** ipsum odio blandit nisl***REMOVED*** et pulvinar nulla justo non augue. Cras diam ante***REMOVED*** hendrerit non gravida vel***REMOVED*** maximus at ipsum. Quisque at nunc sed urna porta sagittis ut lobortis nisl. Ut at ullamcorper ex***REMOVED*** sed fermentum eros. Morbi sit amet odio gravida magna eleifend tincidunt. Nulla a semper eros. Sed congue libero in dui tempus***REMOVED*** et gravida velit molestie. Etiam fringilla massa et nunc pretium tempus.
            
            In hac habitasse platea dictumst. Duis euismod dui ut nibh gravida ultricies. Phasellus maximus ultrices arcu sed egestas. Nunc hendrerit arcu vel orci tincidunt eleifend. Nunc cursus turpis sed mauris pretium***REMOVED*** sed finibus dolor dignissim. Integer sit amet lobortis nibh***REMOVED*** vitae pretium nibh. Donec pharetra erat id felis fringilla facilisis. Phasellus eget egestas nunc.
            
            Donec eros diam***REMOVED*** pellentesque a euismod non***REMOVED*** tincidunt sed nulla. Proin mauris leo***REMOVED*** suscipit eu mattis ac***REMOVED*** luctus nec metus. Donec iaculis gravida dui. Curabitur posuere sed quam a varius. Suspendisse tempor purus odio***REMOVED*** in congue erat tempor vehicula. Aliquam porttitor eros sed ante aliquam***REMOVED*** eu semper erat viverra. Vestibulum in malesuada massa. Pellentesque auctor quam odio***REMOVED*** eget mattis lectus placerat ac. Morbi at tincidunt ante***REMOVED*** non facilisis justo.
            
            Morbi id tempus lorem. Nulla aliquet nisi lectus***REMOVED*** sed dignissim lacus pharetra in. Donec dictum nisl in leo convallis ultricies. Curabitur faucibus sollicitudin augue vel consequat. Phasellus a nunc urna. Curabitur mollis***REMOVED*** risus ut tristique dapibus***REMOVED*** sapien mi porta urna***REMOVED*** sit amet pharetra justo ligula ac nisi. Morbi rutrum elit sed ligula aliquam fermentum vitae in erat.
            
            Nullam facilisis cursus lorem a efficitur. Nulla auctor nibh eu massa ultrices dapibus quis placerat nunc. Nullam rutrum venenatis bibendum. Donec eget mattis risus. Orci varius natoque penatibus et magnis dis parturient montes***REMOVED*** nascetur ridiculus mus. Mauris vitae maximus mauris. Ut rhoncus tristique suscipit. Ut convallis tempor quam non mollis. Proin tincidunt ipsum in velit tincidunt***REMOVED*** in elementum erat ullamcorper. Nam rutrum id ante vel porta. Nam aliquam enim dolor***REMOVED*** sed suscipit tellus porttitor quis. Morbi turpis odio***REMOVED*** porta et fringilla et***REMOVED*** elementum condimentum urna. Nunc tincidunt metus et lacus aliquet***REMOVED*** eget tincidunt risus vestibulum. Vivamus elit magna***REMOVED*** vestibulum eget volutpat in***REMOVED*** tincidunt sit amet arcu. Donec a sem vel felis malesuada rhoncus eu at eros. In. `***REMOVED***
            
            "tags": ["Tensorflow"***REMOVED*** "Some tag"***REMOVED*** "Try this long tag"***REMOVED*** "is it working"]***REMOVED***
            "additional_tags": ["Tensorflow"***REMOVED*** "Some tag"***REMOVED*** "Try this long tag"***REMOVED*** "is it working"***REMOVED*** 'add me also'***REMOVED*** "be different"]***REMOVED***
            "img_url": [
                process.env.PUBLIC_URL + '/images/thumbnail.png'***REMOVED***
                process.env.PUBLIC_URL + '/images/timeout.png'
            ]***REMOVED***
            "externalLinks": [
    ***REMOVED***
                    "title": "Figma"***REMOVED***
                    "link": "https://www.github.com/singalkunal/HandGesture"***REMOVED***
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb"***REMOVED***
                    filename: ""
    ***REMOVED***
    ***REMOVED***
                    "title": "Figma"***REMOVED***
                    "link": "https://www.github.com/singalkunal/HandGesture"***REMOVED***
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb"***REMOVED***
                    filename: ""
    ***REMOVED***
    ***REMOVED***
                    "title": "Figma"***REMOVED***
                    "link": "https://www.github.com/singalkunal/HandGesture"***REMOVED***
                    icon_url: ""***REMOVED***
                    filename: ""
***REMOVED***
            ]
    ***REMOVED******REMOVED***
        
***REMOVED***
            "title": "Hand Gesture"***REMOVED***
            "brief": "Flask Api to facilitate playing of 2d arcade games on mobile devices using custom gestures. Supports real time training of ml models."***REMOVED***
            "detail": `

            Lorem ipsum dolor sit amet***REMOVED*** consectetur adipiscing elit. Proin venenatis felis a ex viverra convallis. Quisque lacinia nisi enim***REMOVED*** sollicitudin dapibus ante pulvinar quis. Nunc dolor erat***REMOVED*** iaculis non neque accumsan***REMOVED*** tempus ornare massa. Maecenas quis ante laoreet mi commodo consectetur ut sed eros. Sed viverra quis felis quis eleifend. Fusce volutpat ipsum quis dolor dapibus***REMOVED*** in bibendum ante convallis. Nam quis nisi vel velit auctor egestas sodales id nulla. In in ornare augue***REMOVED*** et porttitor nunc. Sed metus felis***REMOVED*** pellentesque id ex eget***REMOVED*** lacinia tincidunt nunc. In placerat a urna eget maximus. Nunc ultricies facilisis nunc feugiat sagittis. Aliquam erat volutpat. Vestibulum suscipit odio sed interdum lacinia. Fusce pharetra ac nisl vel ultrices. Proin ex turpis***REMOVED*** aliquam ut metus a***REMOVED*** luctus porttitor augue. Integer egestas ornare risus a tincidunt.
            
            Suspendisse hendrerit***REMOVED*** turpis sit amet dapibus tristique***REMOVED*** ipsum odio blandit nisl***REMOVED*** et pulvinar nulla justo non augue. Cras diam ante***REMOVED*** hendrerit non gravida vel***REMOVED*** maximus at ipsum. Quisque at nunc sed urna porta sagittis ut lobortis nisl. Ut at ullamcorper ex***REMOVED*** sed fermentum eros. Morbi sit amet odio gravida magna eleifend tincidunt. Nulla a semper eros. Sed congue libero in dui tempus***REMOVED*** et gravida velit molestie. Etiam fringilla massa et nunc pretium tempus.
            
            In hac habitasse platea dictumst. Duis euismod dui ut nibh gravida ultricies. Phasellus maximus ultrices arcu sed egestas. Nunc hendrerit arcu vel orci tincidunt eleifend. Nunc cursus turpis sed mauris pretium***REMOVED*** sed finibus dolor dignissim. Integer sit amet lobortis nibh***REMOVED*** vitae pretium nibh. Donec pharetra erat id felis fringilla facilisis. Phasellus eget egestas nunc.
            
            Donec eros diam***REMOVED*** pellentesque a euismod non***REMOVED*** tincidunt sed nulla. Proin mauris leo***REMOVED*** suscipit eu mattis ac***REMOVED*** luctus nec metus. Donec iaculis gravida dui. Curabitur posuere sed quam a varius. Suspendisse tempor purus odio***REMOVED*** in congue erat tempor vehicula. Aliquam porttitor eros sed ante aliquam***REMOVED*** eu semper erat viverra. Vestibulum in malesuada massa. Pellentesque auctor quam odio***REMOVED*** eget mattis lectus placerat ac. Morbi at tincidunt ante***REMOVED*** non facilisis justo.
            
            Morbi id tempus lorem. Nulla aliquet nisi lectus***REMOVED*** sed dignissim lacus pharetra in. Donec dictum nisl in leo convallis ultricies. Curabitur faucibus sollicitudin augue vel consequat. Phasellus a nunc urna. Curabitur mollis***REMOVED*** risus ut tristique dapibus***REMOVED*** sapien mi porta urna***REMOVED*** sit amet pharetra justo ligula ac nisi. Morbi rutrum elit sed ligula aliquam fermentum vitae in erat.
            
            Nullam facilisis cursus lorem a efficitur. Nulla auctor nibh eu massa ultrices dapibus quis placerat nunc. Nullam rutrum venenatis bibendum. Donec eget mattis risus. Orci varius natoque penatibus et magnis dis parturient montes***REMOVED*** nascetur ridiculus mus. Mauris vitae maximus mauris. Ut rhoncus tristique suscipit. Ut convallis tempor quam non mollis. Proin tincidunt ipsum in velit tincidunt***REMOVED*** in elementum erat ullamcorper. Nam rutrum id ante vel porta. Nam aliquam enim dolor***REMOVED*** sed suscipit tellus porttitor quis. Morbi turpis odio***REMOVED*** porta et fringilla et***REMOVED*** elementum condimentum urna. Nunc tincidunt metus et lacus aliquet***REMOVED*** eget tincidunt risus vestibulum. Vivamus elit magna***REMOVED*** vestibulum eget volutpat in***REMOVED*** tincidunt sit amet arcu. Donec a sem vel felis malesuada rhoncus eu at eros. In. `***REMOVED***
            
            "tags": ["Tensorflow"***REMOVED*** "Some tag"***REMOVED*** "Try this long tag"***REMOVED*** "is it working"]***REMOVED***
            "additional_tags": ["Tensorflow"***REMOVED*** "Some tag"***REMOVED*** "Try this long tag"***REMOVED*** "is it working"***REMOVED*** 'add me also'***REMOVED*** "be different"]***REMOVED***
            "img_url": [
                process.env.PUBLIC_URL + '/images/thumbnail.png'***REMOVED***
                process.env.PUBLIC_URL + '/images/timeout.png'
            ]***REMOVED***
            "externalLinks": [
    ***REMOVED***
                    "title": "Figma"***REMOVED***
                    "link": "https://www.github.com/singalkunal/HandGesture"***REMOVED***
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F19c1edc5718d38171b15ef4cb76d6678-mem.png?alt=media&token=77c90c2b-45bd-4f9a-a592-c99061cfca3f"***REMOVED***
                    filename: ""
    ***REMOVED***
    ***REMOVED***
                    "title": "Figma"***REMOVED***
                    "link": "https://www.github.com/singalkunal/HandGesture"***REMOVED***
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F19c1edc5718d38171b15ef4cb76d6678-mem.png?alt=media&token=77c90c2b-45bd-4f9a-a592-c99061cfca3f"***REMOVED***
                    filename: ""
    ***REMOVED***
    ***REMOVED***
                    "title": "Figma"***REMOVED***
                    "link": "https://www.github.com/singalkunal/HandGesture"***REMOVED***
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F19c1edc5718d38171b15ef4cb76d6678-mem.png?alt=media&token=77c90c2b-45bd-4f9a-a592-c99061cfca3f"***REMOVED***
                    filename: ""
***REMOVED***
            ]
    ***REMOVED***
    ];

    return (
        <section className="experiences" id="experiences">
***REMOVED***
                experiencesDummy.map((experience***REMOVED*** index) => {
                    return <Experience 
                                experience={experience} 
                                bgColor={bgColors[index%bgColors.length]} 
                                faceClass={faceClass[index%2]} 
                                editMode={editMode}
                                key={experience.id || experience._id}
                            />
***REMOVED***)
***REMOVED***
        </section>
    )
}

export default Experiences
