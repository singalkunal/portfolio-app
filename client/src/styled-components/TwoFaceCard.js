import styled from 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';



// export const FaceCardInner = styled.div`
//     display: block;
//     position: relative;
//     width: 100%;
//     height: 100%;
//     text-align: center;
// `

const Card = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
`
export const FaceCardFront = styled(Card)`

`

export const FaceCardBack = styled(Card)`
    height: 100%;
    &.transition-enter{
        opacity: 0;
    }

    &.transition-enter-active{
        opacity: 1;
        transition: all ${props => props.faceCardTransitionTime || 500 }ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &.transition-exit-active{
        opacity: 0;
        transition: all ${props => props.faceCardTransitionTime || 500 }ms cubic-bezier(0.16, 1, 0.3, 1);
    }
`
export const StyledTwoFaceCard = styled.div`
    width: 100%;
    max-width: 360px;
    min-width: 350px;
    aspect-ratio: 4/5;
    border: 1px solid #f1f1f1;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    background-color: transparent;
`

const TwoFaceCard = ({ children, flipped }) => {
    return (
        <StyledTwoFaceCard>
            {/* <FaceCardInner flipped={flipped} > */}
                {children}
            {/* </FaceCardInner> */}
        </StyledTwoFaceCard>
    )
}



export default TwoFaceCard;