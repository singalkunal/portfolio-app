import Tags from './Tags';

import '../css/Experience.css'
import ExternalLinks from './ExternalLinks';
import Button from './Button';
import { useEffect } from 'react';

const Experience = ({ 
    experience, 
    bgColor, 
    faceClass, 
    editMode,
    id="",
    onEditExp=null
}) => {
    // editMode is boolean 
    // if user is in editing mode (editMode = True) then show edit buttons

    // image move on hover animation
    const imgHover = (e) => {
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        if(width < 1000) return;
        const [img1, img2] = e.currentTarget.querySelectorAll('img');

        if(img1) {
            img1.style.transform = "translate3d(10px, 10px, -5px)"
            img1.style.transition = "transform 330ms ease-in-out"
        }

        if(img2) {
            img2.style.transform = "translate3d(-10px, -10px, 5px)"
            img2.style.transition = "transform 330ms ease-in-out"
        }

    };

    const imgrmHover = (e) => {
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        if(width < 1000) return;

        const [img1, img2] = e.currentTarget.querySelectorAll('img');

        if(img1) {
            img1.style.transform = "translate3d(0, 0, 0)"
            img1.style.transition = "transform 330ms ease-in-out"
        }

        if(img2) {
            img2.style.transform = "translate3d(0, 0, 0)"
            img2.style.transition = "transform 330ms ease-in-out"
        }
    };
    
    return (        
            <div id={id}>   
                <div className={"experience " + faceClass} style={{backgroundColor: bgColor}} >
                    <div className="exp-container">
                        <div className='info'>
                            <div className="title">{experience.title}</div>
                            <div className="brief">{experience.brief}</div>

                            <ExternalLinks showReveal={true} experience={experience}/>
                        </div>

                        <div className="exp-images" onMouseOver={imgHover} onMouseLeave={imgrmHover}>
                            {
                                experience.img_url.map(url => {
                                    return <img src={url} alt="Can't load image" />
                                })
                            }
                        </div>
                        <Tags tags={experience.tags}/>
                    </div>
                    {
                        editMode 
                        &&
                        <Button 
                            label="Edit"
                            iconClass="fas fa-edit"
                            className="exp-edit"
                            id={id}
                            onClick={onEditExp}
                        ></Button>
                    }
                </div>
            </div>
    )
}

export default Experience
