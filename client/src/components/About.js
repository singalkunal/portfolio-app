import '../css/About.css';
import ProfileLinks from './ProfileLinks';

const About = ({ about ***REMOVED*** => {
    // const about = portfolio.about;
    const url = about.img_url;
    const desc = about.desc;
    const profileLinks = about.profileLinks 

    return (
        <section className="about" id="about">
            <div className="profileImg">
                <img src={url} alt="No profile image"/>
            </div>
            <div className="intro">
                <div className="banner">
                    <div className="wave">Hi***REMOVED*** I am</div>
                    <div className="name"> {about.name || 'No name'}</div>
                </div>
                <div className="desc">
        ***REMOVED***about.desc || desc}
                </div>
                
                <ProfileLinks profileLinks={profileLinks}/>
            </div>
        </section>
    )
}

export default About
