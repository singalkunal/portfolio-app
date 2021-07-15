import '../css/About.css';
import ProfileLinks from './ProfileLinks';

const About = ({ about }) => {
    // const about = portfolio.about;
    const url = about.img_url;
    const desc = about.desc;
    const profile_links = about.profile_links 

    return (
        <section className="about" id="about">
            <div className="profileImg">
                <img src={url} alt="No profile image"/>
            </div>
            <div className="intro">
                <div className="banner">
                    <div className="wave">Hi, I am</div>
                    <div className="name"> {about.firstname  ? about.firstname + ' ' + about.lastname : 'No name'}</div>
                </div>
                <div className="desc">
                    {about.desc || desc}
                </div>
                
                <ProfileLinks profile_links={profile_links}/>
            </div>
        </section>
    )
}

export default About
