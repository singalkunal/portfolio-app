import { useEffect, useState } from 'react';
import '../css/Experiences.css';
import Experience from './Experience';

const Experiences = ({ 
    experiences, 
    editMode=false, 
    onEditExp
 }) => {
    const bgColors =  ['#283250', '#174954', '#214656', '#6E8695', '#252323', '#462025', '#A39C8F', '#70798C'];
    const [faceClass, _] = useState(['face-right', 'face-left']);

    const experiencesDummy = [
        {
            "title": "Hand Gesture",
            "brief": "Flask Api to facilitate playing of 2d arcade games on mobile devices using custom gestures. Supports real time training of ml models.",
            "detail": `

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis felis a ex viverra convallis. Quisque lacinia nisi enim, sollicitudin dapibus ante pulvinar quis. Nunc dolor erat, iaculis non neque accumsan, tempus ornare massa. Maecenas quis ante laoreet mi commodo consectetur ut sed eros. Sed viverra quis felis quis eleifend. Fusce volutpat ipsum quis dolor dapibus, in bibendum ante convallis. Nam quis nisi vel velit auctor egestas sodales id nulla. In in ornare augue, et porttitor nunc. Sed metus felis, pellentesque id ex eget, lacinia tincidunt nunc. In placerat a urna eget maximus. Nunc ultricies facilisis nunc feugiat sagittis. Aliquam erat volutpat. Vestibulum suscipit odio sed interdum lacinia. Fusce pharetra ac nisl vel ultrices. Proin ex turpis, aliquam ut metus a, luctus porttitor augue. Integer egestas ornare risus a tincidunt.
            
            Suspendisse hendrerit, turpis sit amet dapibus tristique, ipsum odio blandit nisl, et pulvinar nulla justo non augue. Cras diam ante, hendrerit non gravida vel, maximus at ipsum. Quisque at nunc sed urna porta sagittis ut lobortis nisl. Ut at ullamcorper ex, sed fermentum eros. Morbi sit amet odio gravida magna eleifend tincidunt. Nulla a semper eros. Sed congue libero in dui tempus, et gravida velit molestie. Etiam fringilla massa et nunc pretium tempus.
            
            In hac habitasse platea dictumst. Duis euismod dui ut nibh gravida ultricies. Phasellus maximus ultrices arcu sed egestas. Nunc hendrerit arcu vel orci tincidunt eleifend. Nunc cursus turpis sed mauris pretium, sed finibus dolor dignissim. Integer sit amet lobortis nibh, vitae pretium nibh. Donec pharetra erat id felis fringilla facilisis. Phasellus eget egestas nunc.
            
            Donec eros diam, pellentesque a euismod non, tincidunt sed nulla. Proin mauris leo, suscipit eu mattis ac, luctus nec metus. Donec iaculis gravida dui. Curabitur posuere sed quam a varius. Suspendisse tempor purus odio, in congue erat tempor vehicula. Aliquam porttitor eros sed ante aliquam, eu semper erat viverra. Vestibulum in malesuada massa. Pellentesque auctor quam odio, eget mattis lectus placerat ac. Morbi at tincidunt ante, non facilisis justo.
            
            Morbi id tempus lorem. Nulla aliquet nisi lectus, sed dignissim lacus pharetra in. Donec dictum nisl in leo convallis ultricies. Curabitur faucibus sollicitudin augue vel consequat. Phasellus a nunc urna. Curabitur mollis, risus ut tristique dapibus, sapien mi porta urna, sit amet pharetra justo ligula ac nisi. Morbi rutrum elit sed ligula aliquam fermentum vitae in erat.
            
            Nullam facilisis cursus lorem a efficitur. Nulla auctor nibh eu massa ultrices dapibus quis placerat nunc. Nullam rutrum venenatis bibendum. Donec eget mattis risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae maximus mauris. Ut rhoncus tristique suscipit. Ut convallis tempor quam non mollis. Proin tincidunt ipsum in velit tincidunt, in elementum erat ullamcorper. Nam rutrum id ante vel porta. Nam aliquam enim dolor, sed suscipit tellus porttitor quis. Morbi turpis odio, porta et fringilla et, elementum condimentum urna. Nunc tincidunt metus et lacus aliquet, eget tincidunt risus vestibulum. Vivamus elit magna, vestibulum eget volutpat in, tincidunt sit amet arcu. Donec a sem vel felis malesuada rhoncus eu at eros. In. `,
            
            "tags": ["Tensorflow", "Some tag", "Try this long tag", "is it working"],
            "additional_tags": ["Tensorflow", "Some tag", "Try this long tag", "is it working", 'add me also', "be different"],
            "img_url": [
                process.env.PUBLIC_URL + '/images/thumbnail.png',
                process.env.PUBLIC_URL + '/images/timeout.png'
            ],
            "external_links": [
                {
                    "title": "Figma",
                    "link": "https://www.github.com/singalkunal/HandGesture",
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb",
                    filename: ""
                },
                {
                    "title": "Figma",
                    "link": "https://www.github.com/singalkunal/HandGesture",
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F3471aed5c7d2da8837fe95bbe597f141-class.png?alt=media&token=650625aa-b601-4ccf-a4da-7921b8bcecfb",
                    filename: ""
                },
                {
                    "title": "Figma",
                    "link": "https://www.github.com/singalkunal/HandGesture",
                    icon_url: "",
                    filename: ""
                }
            ]
        },
        
        {
            "title": "Hand Gesture",
            "brief": "Flask Api to facilitate playing of 2d arcade games on mobile devices using custom gestures. Supports real time training of ml models.",
            "detail": `

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis felis a ex viverra convallis. Quisque lacinia nisi enim, sollicitudin dapibus ante pulvinar quis. Nunc dolor erat, iaculis non neque accumsan, tempus ornare massa. Maecenas quis ante laoreet mi commodo consectetur ut sed eros. Sed viverra quis felis quis eleifend. Fusce volutpat ipsum quis dolor dapibus, in bibendum ante convallis. Nam quis nisi vel velit auctor egestas sodales id nulla. In in ornare augue, et porttitor nunc. Sed metus felis, pellentesque id ex eget, lacinia tincidunt nunc. In placerat a urna eget maximus. Nunc ultricies facilisis nunc feugiat sagittis. Aliquam erat volutpat. Vestibulum suscipit odio sed interdum lacinia. Fusce pharetra ac nisl vel ultrices. Proin ex turpis, aliquam ut metus a, luctus porttitor augue. Integer egestas ornare risus a tincidunt.
            
            Suspendisse hendrerit, turpis sit amet dapibus tristique, ipsum odio blandit nisl, et pulvinar nulla justo non augue. Cras diam ante, hendrerit non gravida vel, maximus at ipsum. Quisque at nunc sed urna porta sagittis ut lobortis nisl. Ut at ullamcorper ex, sed fermentum eros. Morbi sit amet odio gravida magna eleifend tincidunt. Nulla a semper eros. Sed congue libero in dui tempus, et gravida velit molestie. Etiam fringilla massa et nunc pretium tempus.
            
            In hac habitasse platea dictumst. Duis euismod dui ut nibh gravida ultricies. Phasellus maximus ultrices arcu sed egestas. Nunc hendrerit arcu vel orci tincidunt eleifend. Nunc cursus turpis sed mauris pretium, sed finibus dolor dignissim. Integer sit amet lobortis nibh, vitae pretium nibh. Donec pharetra erat id felis fringilla facilisis. Phasellus eget egestas nunc.
            
            Donec eros diam, pellentesque a euismod non, tincidunt sed nulla. Proin mauris leo, suscipit eu mattis ac, luctus nec metus. Donec iaculis gravida dui. Curabitur posuere sed quam a varius. Suspendisse tempor purus odio, in congue erat tempor vehicula. Aliquam porttitor eros sed ante aliquam, eu semper erat viverra. Vestibulum in malesuada massa. Pellentesque auctor quam odio, eget mattis lectus placerat ac. Morbi at tincidunt ante, non facilisis justo.
            
            Morbi id tempus lorem. Nulla aliquet nisi lectus, sed dignissim lacus pharetra in. Donec dictum nisl in leo convallis ultricies. Curabitur faucibus sollicitudin augue vel consequat. Phasellus a nunc urna. Curabitur mollis, risus ut tristique dapibus, sapien mi porta urna, sit amet pharetra justo ligula ac nisi. Morbi rutrum elit sed ligula aliquam fermentum vitae in erat.
            
            Nullam facilisis cursus lorem a efficitur. Nulla auctor nibh eu massa ultrices dapibus quis placerat nunc. Nullam rutrum venenatis bibendum. Donec eget mattis risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae maximus mauris. Ut rhoncus tristique suscipit. Ut convallis tempor quam non mollis. Proin tincidunt ipsum in velit tincidunt, in elementum erat ullamcorper. Nam rutrum id ante vel porta. Nam aliquam enim dolor, sed suscipit tellus porttitor quis. Morbi turpis odio, porta et fringilla et, elementum condimentum urna. Nunc tincidunt metus et lacus aliquet, eget tincidunt risus vestibulum. Vivamus elit magna, vestibulum eget volutpat in, tincidunt sit amet arcu. Donec a sem vel felis malesuada rhoncus eu at eros. In. `,
            
            "tags": ["Tensorflow", "Some tag", "Try this long tag", "is it working"],
            "additional_tags": ["Tensorflow", "Some tag", "Try this long tag", "is it working", 'add me also', "be different"],
            "img_url": [
                process.env.PUBLIC_URL + '/images/thumbnail.png',
                process.env.PUBLIC_URL + '/images/timeout.png'
            ],
            "external_links": [
                {
                    "title": "Figma",
                    "link": "https://www.github.com/singalkunal/HandGesture",
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F19c1edc5718d38171b15ef4cb76d6678-mem.png?alt=media&token=77c90c2b-45bd-4f9a-a592-c99061cfca3f",
                    filename: ""
                },
                {
                    "title": "Figma",
                    "link": "https://www.github.com/singalkunal/HandGesture",
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F19c1edc5718d38171b15ef4cb76d6678-mem.png?alt=media&token=77c90c2b-45bd-4f9a-a592-c99061cfca3f",
                    filename: ""
                },
                {
                    "title": "Figma",
                    "link": "https://www.github.com/singalkunal/HandGesture",
                    icon_url: "https://firebasestorage.googleapis.com/v0/b/create-portfolio-app.appspot.com/o/60ca70df33c9a19de7d55d48%2Ficon%2F19c1edc5718d38171b15ef4cb76d6678-mem.png?alt=media&token=77c90c2b-45bd-4f9a-a592-c99061cfca3f",
                    filename: ""
                }
            ]
        }
    ];

    useEffect(() => {
    }, [experiences])
    return (
        <section className="experiences" id="experiences">
            {
                experiences.map((experience, index) => {
                    return <Experience 
                                experience={experience} 
                                bgColor={bgColors[index%bgColors.length]} 
                                faceClass={faceClass[index%2]} 
                                editMode={editMode}
                                onEditExp={onEditExp}
                                key={experience._id}
                                id={experience._id}
                            />
                })
            }
        </section>
    )
}

export default Experiences
