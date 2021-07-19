import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import SuchEmpty from '../public/images/such-empty-much-meaning-wow.jpg';
const StyledEmptyPage = styled.div`
    padding-top: 130px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const EmptyImg = styled.img`
    /* width: 100%;
    height: 100%; */
    width: 240px;
    height: 200px;

    & img {
        width: 100%;
        height: 100%;
    }
`
const InlineLink = styled(Link)`
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    text-decoration: underline;
`

const EmptyPage = () => {
    return (
        <StyledEmptyPage>
            <EmptyImg src={SuchEmpty} />
            <h2>Be the first one to post...</h2>
            <p>Go to <InlineLink to="/account">Account Page</InlineLink> and click on Post Portfolio</p>
        </StyledEmptyPage>
    )
}

export default EmptyPage
