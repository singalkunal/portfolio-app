import HomeIcon from '../icons/home_fill.svg';
import '../css/Navbar.css';

import LinkIcon from '../icons/link-dark.svg';
import Button from './Button';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

import FaIconLink from '../styled-components/FaIconLink';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import CommunityIcon from '../icons/community.svg';

import styled from 'styled-components/macro';

const MyLink = styled(Link)`
    display: flex;
    align-items: center;

    /* border-right: 1px solid #c4c4c4;
    border-left: 1px solid #c4c4c4; */
`
const Icon = styled.i`
    width: 32px;
    height: 32px;
`


const Navbar = () => {
    const showLink = {
        title: 'Resume',
        link: 'www.google.com'
    }

    const { showMail } = useContext(LiveUpdateContext);

    return (
        <nav className="navbar">
            <FaIconLink icon={faHome} link="/#" />
            
            {
                showLink
                &&
                <MyLink to='/community' className="main-nav-item special">
                    {/* <i><img src={LinkIcon} alt="" /></i> */}
                    <Icon> <img src={CommunityIcon} alt=""/> </Icon>
                    <span className="text">Community</span>
                </MyLink>
            }


            <a href={`mailto:${showMail ||  process.env.EMAIL}`} className="main-nav-item button takeme">
                {'Mail ' + (showMail ? 'Me' : 'Us')}
            </a>

        </nav>
    )
}

export default Navbar
