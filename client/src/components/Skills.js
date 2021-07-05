import Skill from "./Skill";

import '../css/Skills.css';
import SkillBg from '../icons/skillbg.svg';

const Skills = ({
    skills
***REMOVED*** => {
    return (
        <section id="skills" style={{backgroundImage:`url(${SkillBg}`}} >
***REMOVED***
                (skills || []).map(skill => {
                    return <Skill skill={skill} key={skill._id || skill.id} />
***REMOVED***)
***REMOVED***

***REMOVED***/* <div className="dummybg" style={{backgroundImage:`url(${SkillBg***REMOVED***`}}></div> */}
        </section>
    )
}

export default Skills
