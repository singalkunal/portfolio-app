import { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components/macro';
import { Link, useHistory, useLocation } from 'react-router-dom';

import TwoFaceCard, { FaceCardFront, FaceCardBack } from './TwoFaceCard';
import { StyledAttributes, StyledAttribute } from './Attributes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as fasThumbsUp, faHeart as fasHeart, faEllipsisH, faExternalLinkAlt, faMinus } from '@fortawesome/free-solid-svg-icons';

import { CSSTransition } from 'react-transition-group'
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const cssVariables = {
    postTransitionTime: 1000, // ms
    faceCardTransitionTime: 500
};

const PostImage = styled.div`
    display: flex;
    justify-content: center;
    transition: all 200ms ease-in-out;
    width: 100%;
    height: 100%;

    & img {
        display: block;
        width: 100%;
        height: 100%;

        border-radius: 15px;
    }
`

const PostOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 200ms ease-in-out;

    width: 100%;
    height: 100%;

    background-color: rgba(18, 18, 18, 0.85);
    color: white;
    border-radius: 15px;

    /* position: absolute; */

`
const OverlayAttributes = styled(StyledAttributes)`
    flex-direction: column;
    /* justify-content: flex-start; */
    align-items: flex-start;
    width: fit-content;

    & ${StyledAttribute} {
        padding: 10px 0;
    }
`


const PostMain = styled.main`
    font-size: 13px;
`



export const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 360px;

    &.transition-appear{
        /* transform: opacity(0.1); */
        opacity: 0.1;
    }

    &.transition-appear-active {
        /* transform: opacity(1); */
        opacity: 1;
        transition: all ${cssVariables.postTransitionTime}ms cubic-bezier(0.16, 1, 0.3, 1);
    }
`

const Post = ({ 
    showCommentForMe,
    onLike,
    onComment,
    post={}
}) => {
    const history = useHistory();

    const [flipped, setFlipped] = useState(false);

    
    return (
        
        <CSSTransition
            in={true}
            appear={true}
            timeout={cssVariables.postTransitionTime}
            classNames="transition"
        >
            <StyledPost
                id={post._id}
            >
                <PostHeader>
                    <Link to="/portfolio/posted_by">
                        <span>&#64;{post.user.username}</span>
                    </Link>
                    <FontAwesomeIcon icon={flipped ? faMinus : faEllipsisH} size="2x" onClick={() => setFlipped(prev => !prev)} />
                </PostHeader>
                
                <TwoFaceCard>
                    <FaceCardFront>
                        <PostImage>
                            <img src={post.img_url} alt="No image found" />
                        </PostImage>
                    </FaceCardFront>

                    <CSSTransition
                        in={flipped}
                        timeout={cssVariables.faceCardTransitionTime}
                        classNames="transition"
                        unmountOnExit
                    >
                        <FaceCardBack faceCardTransitionTime={cssVariables.faceCardTransitionTime}>
                            <PostOverlay>
                                <OverlayAttributes>
                                    <StyledAttribute 
                                        icon={faExternalLinkAlt} 
                                        fontSize="20px"
                                        label="Portfolio" 
                                        onClick={() => history.push(`/portfolio/${post.username}`)} 
                                    />
                                    <StyledAttribute 
                                        icon={faComment} 
                                        fontSize="20px"
                                        label="Show Comments" 
                                        onClick={() => {
                                            setFlipped(false);
                                            showCommentForMe(post._id)
                                        }}
                                    />
                                </OverlayAttributes>                
                            </PostOverlay>
                        </FaceCardBack>
                    </CSSTransition>

                </TwoFaceCard>

                <StyledAttributes>
                    <StyledAttribute icon={post.liked ? fasHeart : faHeart} label={post.likesCount} onClick={onLike} />
                    <StyledAttribute icon={faComment} label={post.commentsCount} onClick={onComment} />
                </StyledAttributes>

                <PostMain>
                    <span> {post.desc} </span>
                </PostMain>

            </StyledPost>
        </CSSTransition>
    )
}

const PostHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;

    & span {
        font-size: 14px;
        font-weight: 500;
    }

    /* & svg path{
        width: 24px !important;
    } */
`


export default Post;
