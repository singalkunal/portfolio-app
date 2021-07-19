import { useState, useEffect, useRef } from 'react';

const useModal = ({activeClass}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalContainerRef = useRef(null); // ref to container element containing overlay and modal

    const openModal = () => {
        
        setIsModalOpen(true);
        const body = document.querySelector('body');
        body.style.overflow = "hidden";

        if(!modalContainerRef || !modalContainerRef.current) return;

        const modal = modalContainerRef.current;

        for (let element of modal.children) {
            element.classList.add(activeClass);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        const body = document.querySelector('body');
        body.style.overflowY = "scroll";

        if(!modalContainerRef || !modalContainerRef.current) return;

        const modal = modalContainerRef.current;

        for (let element of modal.children) {
            element.classList.remove(activeClass);
        }
    }

    return { isModalOpen, modalContainerRef, openModal, closeModal }
};

export default useModal;