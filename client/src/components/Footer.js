import { Link } from 'react-router-dom';
import EditIcon from '../icons/edit.svg';

import '../css/Footer.css';
import { useContext, useEffect, useState } from 'react';
import SignOut from './SignOut';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';
import styled from 'styled-components/macro';

const FooterWrapper = styled.div`
`
const Footer = () => {
    const {
        signedInUser, setSignedInUser,
        showFooterButton,
    } = useContext(LiveUpdateContext);
    
    return (
       <FooterWrapper>
                <div id="#footer" className={"footer" + (showFooterButton ? "" : " middle")}>
                <span className="copyright">&copy; 2021 Developed By Kunal</span>
                {
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
                }
            </div>
       </FooterWrapper>
    )
}

export default Footer
