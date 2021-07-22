import { useEffect, useState } from 'react';
import '../css/Experiences.css';
import Experience from './Experience';

const Experiences = ({ 
    experiences, 
    editMode=false, 
    onEditExp
 }) => {
    const bgColors =  ['#283250', '#174954', '#0B5269', '#70798C', '#393E46', '#214656', '#6E8695', '#252323', '#462025', '#A39C8F'];
    const [faceClass, _] = useState(['face-right', 'face-left']);

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
