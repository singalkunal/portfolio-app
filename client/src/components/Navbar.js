import HomeIcon from '../icons/home_fill.svg';
import '../css/Navbar.css';

import LinkIcon from '../icons/link-dark.svg';
import Button from './Button';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const Navbar = () => {
    const showLink = {
        title: 'Resume',
        link: 'www.google.com'
    }

    const { showMail } = useContext(LiveUpdateContext);

    return (
        <nav className="navbar">
        
            <Link to="/" className="main-nav-item" id="home">
                <img src={HomeIcon} alt="" />
            </Link>
            
            {
                showLink
                &&
                <a href={showLink.link} className="main-nav-item special">
                    {/* <i><img src={LinkIcon} alt="" /></i> */}
                    <i className="fas fa-link"></i>
                    <span className="text">{showLink.title}</span>
                </a>
            }


            <a href={`mailto:${showMail ||  process.env.EMAIL}`} className="main-nav-item button takeme">
                {'Mail ' + (showMail ? 'Me' : 'Us')}
            </a>

        </nav>
    )
}

export default Navbar
