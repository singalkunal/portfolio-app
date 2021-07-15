import Skill from "./Skill";

import '../css/Skills.css';
import SkillBg from '../icons/skillbg.svg';

const Skills = ({
    skills
}) => {
    return (
        <section id="skills" style={{backgroundImage:`url(${SkillBg}`}} >
            {
                (skills || []).map(skill => {
                    return <Skill skill={skill} key={skill._id} />
                })
            }

            {/* <div className="dummybg" style={{backgroundImage:`url(${SkillBg})`}}></div> */}
        </section>
    )
}

export default Skills
