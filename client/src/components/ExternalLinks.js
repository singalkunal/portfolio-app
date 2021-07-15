import { useState, useEffect } from 'react';
import '../css/ExternalLinks.css';
import DetailsModal from './DetailsModal';
import useModal from '../hooks/use-modal';

import linkIcon from '../icons/link.svg';

const ExternalLinks =({ showReveal, experience}) => {
    const [revealIconClasses, _] = useState(['fas fa-expand-arrows-alt']);
    // const [modalOpen, setModalOpen] = useState(false);

    const {isModalOpen, openModal, closeModal, modalContainerRef } = useModal({activeClass:"active"});
    const onError = (event) => {
        const img = event.target;
        img.src = linkIcon;
        // img.style.display = "none";
    }

    return (
        <div className="externalLinks">
            {
                showReveal && 
                <a className="link" onClick={openModal} >
                    <i className={`icon ${revealIconClasses}`}></i>
                    <div className="text">Reveal More</div>
                </a>
            }

            {
                // only place modal in DOM if button to open modal is present
                showReveal && <DetailsModal isModalOpen={isModalOpen} experience={experience} closeModal={closeModal} ref={modalContainerRef}/>
            }       

            {
                (experience.external_links || []).map(obj => {

                    return <a href={obj.link} target="_blank" className="link">
                        <i className="icon"><img src={obj.icon_url} onError={onError} /></i>
                        <div className="text">{obj.title}</div>
                    </a>
                })
            }
        </div>
    )
}


export default ExternalLinks;
