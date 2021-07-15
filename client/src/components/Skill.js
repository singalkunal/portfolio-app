const Skill = ({skill***REMOVED*** => {
    return (
        <div className="skill-domain">
            <div className="skill-header">
                <span className="text">{skill.domain}</span>
            </div>

***REMOVED***
                (skill.relatedSkills || []).map(eachSkill => {
                    return <span key={eachSkill._id} className="each-skill text">{eachSkill.skill}</span>
***REMOVED***)
***REMOVED***
        </div>
    )
}

export default Skill
