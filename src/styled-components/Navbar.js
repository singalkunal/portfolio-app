import styled from 'styled-components/macro';

import FaIconLink from './FaIconLink';
import { faHome, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const StyledNavbar = styled.nav` 
    width: 90%;
    min-width: 360px;
    position: fixed;

    padding: 20px 0;
    padding-bottom: 60px;

    background-color: white;

    z-index: 20;
    /* position: relative; */

`
const NavbarInner = styled.div`
    display: flex;
    /* grid-template-columns: repeat(3, 1fr); */

    align-items: center;
    justify-content: space-between;

    padding-bottom: 10px;
    border-bottom: 2px solid #c4c4c4;
`

export const StyledNavItem = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    & span {
        font-size: 24px;
        font-weight: 500;


        padding: 0 20px;
        border-right: 1px solid #c4c4c4;
        border-left: 1px solid #c4c4c4;
    }

    /* border-right: 1px solid #c4c4c4;
    border-left: 1px solid #c4c4c4; */

    
`

const Navbar = ({
    heading="Community",
}) => {

    const scrollToTop = () => {
        window.scrollTo(0,0);
    }

    return (
        <StyledNavbar>
            <NavbarInner>
                <StyledNavItem><FaIconLink icon={faHome} link='/#' /></StyledNavItem>
                <StyledNavItem><span className="head" onClick={scrollToTop}>{heading}</span></StyledNavItem>
                <StyledNavItem><FaIconLink icon={faEnvelopeSquare} external link={`mailto:${process.env.REACT_APP_EMAIL}`}/></StyledNavItem>
            </NavbarInner>
        </StyledNavbar>
    )
}

export default Navbar
