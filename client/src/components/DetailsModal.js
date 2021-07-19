import { forwardRef, useEffect } from 'react';
import '../css/DetailsModal.css';
import ExternalLinks from './ExternalLinks';
import Tags from './Tags';


const DetailsModal = forwardRef(({ experience, closeModal }, ref) => {
    const handleEsc = (event) => {
        if(ref.current?.children[1].classList.contains("active")) {
            if(event.key === 'Escape') closeModal();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        }
    }, []);


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
                        {
                            experience.img_url.map(url => {
                                return <img src={url} alt="Can't load image" />
                            })
                        }
                    </div>
                    <Tags tags={experience.additional_tags}/>
                </div>
            </div>
        </div>
    )
});

export default DetailsModal
