import { Link } from 'react-router-dom';
import EditIcon from '../icons/edit.svg';

import '../css/Footer.css';
import { useContext***REMOVED*** useEffect***REMOVED*** useState } from 'react';
import SignOut from './SignOut';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const Footer = () => {
    const {
        signedInUser***REMOVED*** setSignedInUser***REMOVED***
        showFooterButton
***REMOVED*** = useContext(LiveUpdateContext);
    
    return (
        <div id="#footer" className={"footer" + (showFooterButton ? "" : " middle")}>
            <span className="copyright">&copy; 2021 Developed By Kunal</span>
***REMOVED***
                showFooterButton && (
                    signedInUser
                    ?
                    <SignOut />
                    :
                    <Link to='/' className="takeme button">
                        <i><img src={EditIcon} alt="" /></i>
                        <span className="text">Make you portfolio now</span>
                    </Link>
                )
***REMOVED***
        </div>
    )
}

export default Footer
