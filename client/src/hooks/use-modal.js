import { useState***REMOVED*** useEffect***REMOVED*** useRef } from 'react';

const useModal = ({activeClass***REMOVED*** => {
    const [isModalOpen***REMOVED*** setIsModalOpen] = useState(false);
    const modalContainerRef = useRef(null); // ref to container element containing overlay and modal

    const openModal = () => {
        console.log('open modal called');
        setIsModalOpen(true);
        const body = document.querySelector('body');
        body.style.overflow = "hidden";

        if(!modalContainerRef || !modalContainerRef.current) return;

        const modal = modalContainerRef.current;

        for (let element of modal.children) {
            element.classList.add(activeClass);
    ***REMOVED***
***REMOVED***

    const closeModal = () => {
        console.log('close modal called');
        setIsModalOpen(false);
        const body = document.querySelector('body');
        body.style.overflowY = "scroll";

        if(!modalContainerRef || !modalContainerRef.current) return;

        const modal = modalContainerRef.current;

        for (let element of modal.children) {
            element.classList.remove(activeClass);
    ***REMOVED***
***REMOVED***

    return { isModalOpen***REMOVED*** modalContainerRef***REMOVED*** openModal***REMOVED*** closeModal }
};

export default useModal;