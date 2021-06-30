import { useState***REMOVED*** useEffect } from 'react';
import '../css/ExternalLinks.css';
import DetailsModal from './DetailsModal';
import useModal from '../hooks/use-modal';

import linkIcon from '../icons/link.svg';

const ExternalLinks =({ showReveal***REMOVED*** experience***REMOVED*** => {
    const [revealIconClasses***REMOVED*** _] = useState(['fas fa-expand-arrows-alt']);
    // const [modalOpen***REMOVED*** setModalOpen] = useState(false);

    const {isModalOpen***REMOVED*** openModal***REMOVED*** closeModal***REMOVED*** modalContainerRef } = useModal({activeClass:"active"***REMOVED***
    const onError = (event) => {
        const img = event.target;
        img.src = linkIcon;
        // img.style.display = "none";
***REMOVED***

    return (
        <div className="externalLinks">
***REMOVED***
                showReveal && 
                <a className="link" onClick={openModal} >
                    <i className={`icon ${revealIconClasses}`}></i>
                    <div className="text">Reveal More</div>
                </a>
***REMOVED***

***REMOVED***
                // only place modal in DOM if button to open modal is present
                showReveal && <DetailsModal isModalOpen={isModalOpen} experience={experience} closeModal={closeModal} ref={modalContainerRef}/>
***REMOVED***       

***REMOVED***
                experience.externalLinks.map(obj => {

                    return <a href={obj.link} target="_blank" className="link">
                        <i className="icon"><img src={obj.icon_url} onError={onError} /></i>
                        <div className="text">{obj.title}</div>
                    </a>
***REMOVED***)
***REMOVED***
        </div>
    )
}


export default ExternalLinks;
