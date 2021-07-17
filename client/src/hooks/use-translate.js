import { useState } from 'react';

const useTranslate = () => {
    const in_data = {
        type: 'in',
        banner: 'Henlo vro',
        desc: 'Don\'t have an account ? Make one now...',
        ghostTitle: 'SIGN UP',
        title: 'SIGN IN',
        helptext: 'Forgot Password?',
        ghosticon: 'fas fa-user-plus',
        icon: 'fas fa-sign-in-alt'
        
    }
    const up_data = {
        type: 'up',
        banner: 'Welcome vro',
        desc: 'Already have an account?',
        ghostTitle: 'SIGN IN',
        title: 'SIGN UP',
        helptext: 'Your credentials are safe',
        ghosticon: 'fas fa-sign-in-alt',
        icon: 'fas fa-user-plus'
    }

    const [trans, setTrans] = useState(false)
    const [data, setData] = useState(in_data);
    // 


    const translate = (event, overlay, form) => {
        
        const container = document.querySelector('.auth.form-container');
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        const widthThres = 1000;
        if(trans) {
            


            if(width <= widthThres) {
                form.style.transform = `translateY(0)`;
                overlay.style.transform = `translateY(0)`;
            }
            container.classList.remove('hover');
            setData(in_data);

            // setTimeout(() => {
            //     container.classList.remove('hover');
            // }, 200);
        }
        else {

            if(width <= widthThres) {
                form.style.transform = `translateY(${-overlay.offsetHeight}px)`;
                overlay.style.transform = `translateY(${form.offsetHeight}px)`;
            }

            container.classList.add('hover');

            // setTimeout(() => {
            //     // form.style.transform = `translateY(0)`;
            //     // overlay.style.transform = `translateY(0)`;
            //     form.style.transform = `translateY(0)`;
            //     overlay.style.transform = `translateY(0)`;
            //     container.classList.add('hover');
            // }, 200);
            setData(up_data);
        }

        setTrans(!trans);
    }

    return { translate, data };
}

export default useTranslate;