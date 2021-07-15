import { useState } from "react"
import { Link } from "react-router-dom"

const ProfileLinks = ({ profile_links }) => {
    const onError = (event) => {
        event.preventDefault();

        const img = event.target;
        const text = event.target.nextElementSibling;
        img.style.display = "none";
        text.style.display = "block";
    }
    return (
        <div className="profileLinks">
            {
                profile_links.map(profile => {
                    var classes = profile.classes
                    return  <a href={profile.link}
                     target="_blank"
                    //  title={profile.title}
                    key={profile._id}
                     className="icon">
                        <img src={profile.icon_url}  onError={onError} />
                        <div style={{display:"none"}}>{profile.title}</div>
                    </a>
                })
            }
        </div>
    )
}

export default ProfileLinks
