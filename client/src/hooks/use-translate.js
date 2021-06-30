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
    const out_data = {
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


    const translate = () => {
        console.log('translate')
        const container = document.querySelector('.auth.form-container');

        if(trans) {
            container.classList.remove('hover');
            setTimeout(() => {
                container.classList.remove('changegrid');
***REMOVED***20)
            setData(in_data);
    ***REMOVED***
        else {
            container.classList.add('hover');
            setTimeout(() => {
                container.classList.add('changegrid');
***REMOVED***20)
            setData(out_data);
    ***REMOVED***

        setTrans(!trans);
***REMOVED***

    return { translate***REMOVED*** data };
}

export default useTranslate;