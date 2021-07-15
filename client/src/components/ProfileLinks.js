import { useState } from "react"
import { Link } from "react-router-dom"

const ProfileLinks = ({ profile_links ***REMOVED*** => {
    const onError = (event) => {
        event.preventDefault();

        const img = event.target;
        const text = event.target.nextElementSibling;
        img.style.display = "none";
        text.style.display = "block";
***REMOVED***
    return (
        <div className="profileLinks">
***REMOVED***
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
***REMOVED***)
***REMOVED***
        </div>
    )
}

export default ProfileLinks
