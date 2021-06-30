import { useEffect***REMOVED*** useRef***REMOVED*** forwardRef } from 'react';
import '../css/DetailsModal.css';

import Tags from './Tags';
import ExternalLinks from './ExternalLinks';

const DetailsModal = forwardRef(({ experience***REMOVED*** closeModal }***REMOVED*** ref) => {
    const handleEsc = (event) => {
        if(event.key === 'Escape') closeModal();
***REMOVED***;

    useEffect(() => {
        window.addEventListener('keydown'***REMOVED*** handleEsc);
        return () => {
            window.removeEventListener('keydown'***REMOVED*** handleEsc);
    ***REMOVED***
***REMOVED******REMOVED*** []);


    // useEffect(() => {
    //     const modal = modalRef.current
    //     if(!modal) return;
    //     let element;
    //     if(isModalOpen) {
    //         for (element of modal.children) {
    //             element.classList.add(activeClass);
    //     ***REMOVED***
    // ***REMOVED***
    //     else {
    //         for (element of modal.children) {
    //             element.classList.remove(activeClass);
    //     ***REMOVED***
    // ***REMOVED***
    // }***REMOVED*** [isModalOpen]);

    return (
        <div ref = {ref}>
            <div className="overlay" id="app-overlay" onClick={closeModal}></div>
            <div className='details-modal modal'>
                <div className="modal-container">
                    <div className="btn-wrapper">
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                    </div>
                    <div className='info'>
                        <div className="title">{experience.title}</div>
                        <div className="detail">{experience.detail}</div>

                        <ExternalLinks experience={experience} showReveal={false} />
                    </div>

                    <div className="modal-images">
            ***REMOVED***
                            experience.img_url.map(url => {
                                return <img src={url} alt="Can't load image" />
            ***REMOVED***)
        ***REMOVED***
                    </div>
                    <Tags tags={experience.additional_tags}/>
                </div>
            </div>
        </div>
    )
***REMOVED***

export default DetailsModal
