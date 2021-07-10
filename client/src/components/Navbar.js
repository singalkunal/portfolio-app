import HomeIcon from '../icons/home_fill.svg';
import '../css/Navbar.css';

import LinkIcon from '../icons/link-dark.svg';
import Button from './Button';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';
import { useContext***REMOVED*** useEffect } from 'react';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const Navbar = ({
    mail=null***REMOVED***
    userSignedIn=false
***REMOVED*** => {
    const showLink = {
        title: 'Resume'***REMOVED***
        link: 'www.google.com'
***REMOVED***

    const { userMail } = useContext(LiveUpdateContext);
    useEffect(() => {
        console.log(userMail);
***REMOVED******REMOVED*** [userMail]);

    return (
        <nav className="navbar">
            
            <Link to="/" className="main-nav-item" id="home">
                <img src={HomeIcon} alt="" />
            </Link>
            
***REMOVED***
                showLink
                &&
                <a href={showLink.link} className="main-nav-item special">
        ***REMOVED***/* <i><img src={LinkIcon} alt="" /></i> */}
                    <i className="fas fa-link"></i>
                    <span className="text">{showLink.title}</span>
                </a>
***REMOVED***


***REMOVED***/* {
                userSignedIn
                &&
                <SignOut />
***REMOVED*** */}

            <a href={`mailto:${userMail || process.env.EMAIL}`} className="main-nav-item takeme">
    ***REMOVED***'Mail ' + (userMail ? 'Me' : 'Us')}
            </a>

        </nav>
    )
}

export default Navbar
