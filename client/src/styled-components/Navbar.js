import { useContext***REMOVED*** useEffect } from 'react';
import styled from 'styled-components';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

import FaIconLink from './FaIconLink';
import { faHome***REMOVED*** faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

export const StyledNavbar = styled.nav` 
    width: 100%;
    display: flex;
    /* grid-template-columns: repeat(3***REMOVED*** 1fr); */

    align-items: center;
    justify-content: space-between;

    margin: 20px 0;

    padding-bottom: 10px;
    border-bottom: 2px solid #c4c4c4;

    /* position: relative; */
`

export const StyledNavItem = styled.div`
    display: flex;
    justify-content: center;
    & span {
        font-size: 24px;
        font-weight: 500;


        padding: 0 20px;
        border-right: 1px solid #c4c4c4;
        border-left: 1px solid #c4c4c4;
***REMOVED***

    /* border-right: 1px solid #c4c4c4;
    border-left: 1px solid #c4c4c4; */

    
`

const Navbar = ({
    heading="Community"***REMOVED***
    isDummy=false
***REMOVED*** => {
    return (
        <>
***REMOVED***
            !isDummy
            &&
            <StyledNavbar>
                <StyledNavItem><FaIconLink icon={faHome} link='/#' /></StyledNavItem>
                <StyledNavItem><span className="head">{heading}</span></StyledNavItem>
                <StyledNavItem><FaIconLink icon={faEnvelopeSquare} external link={`mailto:${process.env.REACT_APP_EMAIL}`}/></StyledNavItem>
            </StyledNavbar>
    ***REMOVED***
        </>
    )
}

export default Navbar
