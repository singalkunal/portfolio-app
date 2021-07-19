import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 85%;
    min-height: 70%;
    display: flex;
    min-width: 350px;
    margin: auto;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    /* position: relative; */

    @media only screen and (min-width: 500px) {
        min-height: 80%;
    }
`