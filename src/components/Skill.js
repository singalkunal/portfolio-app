const Skill = ({skill}) => {
    return (
        <div className="skill-domain">
            <div className="skill-header">
                <span className="text">{skill.domain}</span>
            </div>

            {
                (skill.relatedSkills || []).map(eachSkill => {
                    return <span key={eachSkill._id} className="each-skill text">{eachSkill.skill}</span>
                })
            }
        </div>
    )
}

export default Skill
