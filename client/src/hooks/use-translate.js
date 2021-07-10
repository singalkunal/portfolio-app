import { useState } from 'react';

const useTranslate = () => {
    const in_data = {
        type: 'in'***REMOVED***
        banner: 'Henlo vro'***REMOVED***
        desc: 'Don\'t have an account ? Make one now...'***REMOVED***
        ghostTitle: 'SIGN UP'***REMOVED***
        title: 'SIGN IN'***REMOVED***
        helptext: 'Forgot Password?'***REMOVED***
        ghosticon: 'fas fa-user-plus'***REMOVED***
        icon: 'fas fa-sign-in-alt'
        
***REMOVED***
    const up_data = {
        type: 'up'***REMOVED***
        banner: 'Welcome vro'***REMOVED***
        desc: 'Already have an account?'***REMOVED***
        ghostTitle: 'SIGN IN'***REMOVED***
        title: 'SIGN UP'***REMOVED***
        helptext: 'Your credentials are safe'***REMOVED***
        ghosticon: 'fas fa-sign-in-alt'***REMOVED***
        icon: 'fas fa-user-plus'
***REMOVED***

    const [trans***REMOVED*** setTrans] = useState(false)
    const [data***REMOVED*** setData] = useState(in_data);
    // console.log(data);


    const translate = (event***REMOVED*** overlay***REMOVED*** form) => {
        console.log('translate')
        const container = document.querySelector('.auth.form-container');
        var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;

        const widthThres = 1000;
        if(trans) {
            


            if(width <= widthThres) {
                form.style.transform = `translateY(0)`;
                overlay.style.transform = `translateY(0)`;
***REMOVED***
            container.classList.remove('hover');
            setData(in_data);

            // setTimeout(() => {
            //     container.classList.remove('hover');
            // }***REMOVED*** 200);
    ***REMOVED***
        else {

            if(width <= widthThres) {
                form.style.transform = `translateY(${-overlay.offsetHeight}px)`;
                overlay.style.transform = `translateY(${form.offsetHeight}px)`;
***REMOVED***

            container.classList.add('hover');

            // setTimeout(() => {
            //     // form.style.transform = `translateY(0)`;
            //     // overlay.style.transform = `translateY(0)`;
            //     form.style.transform = `translateY(0)`;
            //     overlay.style.transform = `translateY(0)`;
            //     container.classList.add('hover');
            // }***REMOVED*** 200);
            setData(up_data);
    ***REMOVED***

        setTrans(!trans);
***REMOVED***

    return { translate***REMOVED*** data };
}

export default useTranslate;