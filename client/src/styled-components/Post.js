import { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components/macro';
import { Link, useHistory, useLocation } from 'react-router-dom';

import TwoFaceCard, { FaceCardFront, FaceCardBack } from './TwoFaceCard';
import { StyledAttributes, StyledAttribute } from './Attributes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faExpandArrowsAlt, faThumbsUp as fasThumbsUp, faHeart as fasHeart, faEllipsisH, faExternalLinkAlt, faMinus } from '@fortawesome/free-solid-svg-icons';

import { CSSTransition } from 'react-transition-group'
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';
import { SocketContext } from '../contexts/SocketContext';

import CommentBlock from './CommentBlock';
import ProfileLinks from '../components/ProfileLinks';

const cssVariables = {
    postTransitionTime: 1000, // ms
    faceCardTransitionTime: 500,

    minDesktopWidth: "1000px",
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

        max-height: 480px;

        border-radius: 15px;
    }

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        aspect-ratio: 4/5;
        max-width: 324px;
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
    
    & ${StyledAttribute}:nth-of-type(2) {
        @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
            display: none;
        }
    }
`


const PostMain = styled.main`
    font-size: 13px;
`



export const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 360px;

    /* align-items: center; */


    &.transition-appear{
        /* transform: opacity(0.1); */
        opacity: 0.1;
    }

    &.transition-appear-active {
        /* transform: opacity(1); */
        opacity: 1;
        transition: all ${cssVariables.postTransitionTime}ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-width: none;
        width: 55%;
    }

`

const Name = styled.div`
    font-size: 32px;
    font-weight: 900;

    @media only screen and (max-width: ${cssVariables.minDesktopWidth}) {
        display: none;
    }
`

const StyledProfileLinks = styled(ProfileLinks)`
    @media only screen and (max-width: ${cssVariables.minDesktopWidth}) {
        display: none;
    }
`

const DesktopCommentBlock = styled(CommentBlock)`
    // small screens
    @media only screen and (max-width: ${cssVariables.minDesktopWidth}) {
        display: none;
    }
    max-height: 540px;
    overflow-y: scroll;


     /* scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(90, 90, 90);
        border-radius: 15px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
    }

      /* scrollbar for IE, Edge and Firefox */
    & {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: thin;  /* Firefox */
        scrollbar-color: rgb(90,90,90) rgba(1,1,1,0);
    } 

    max-width: 40%;

    border-right: 2px solid #c4c4c4;
    border-top: 2px solid #c4c4c4;
    border-bottom: 2px solid #c4c4c4;

    

`

export const Left = styled.div`
    display: block;
    height: max-content;

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        width: 47%;
    }
`

export const Middle = styled.div`
    display: block;
    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        max-width: 47%;
    }
`

export const DesktopPost = styled.div`
    display: flex;
    /* align-items: center; */
    width: 100%;
    margin-bottom: 50px;

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        margin-bottom: 100px;
    }

    /* max-height: 540px; */
`

const Post = ({ 
    showCommentForMe,
    post={}
}) => {
    const history = useHistory();

    const [flipped, setFlipped] = useState(false);
    const { socket } = useContext(SocketContext);
    const onLike = (event) => {
        event.preventDefault();
        console.log('like');
        socket.emit('toggle-like-post', post._id, obj => {
            console.log(obj);

        })
    }
    
    return (
        
        <CSSTransition
            in={true}
            appear={true}
            timeout={cssVariables.postTransitionTime}
            classNames="transition"
        >
            <DesktopPost>
                <StyledPost
                    id={post._id}
                >
                    <Left>
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
                                                onClick={() => history.push(`/portfolio/${post.user.username}`)} 
                                            />
                                            <StyledAttribute 
                                                icon={faComment} 
                                                fontSize="20px"
                                                label="Show Comments" 
                                                onClick={() => {
                                                    setFlipped(false);
                                                    showCommentForMe({postId: post._id, username: post.user.username})
                                                }}
                                            />
                                        </OverlayAttributes>                
                                    </PostOverlay>
                                </FaceCardBack>
                            </CSSTransition>

                        </TwoFaceCard>

                        <StyledAttributes>
                            <StyledAttribute icon={post.liked ? fasHeart : faHeart} label={post.likesCount} onClick={onLike} />
                            <StyledAttribute icon={faComment} label={post.commentsCount} onClick={() => showCommentForMe({postId: post._id, username: post.user.username})} />
                            <StyledAttribute icon={faExpandArrowsAlt} onClick={() => setFlipped(prev => !prev)} />

                        </StyledAttributes>
                    </Left>

                    <Middle>

                        <PostMain>
                            <Name>{post.name}</Name>
                            <span> {post.desc} </span>
                            <StyledProfileLinks profile_links={post.profile_links} />
                        </PostMain>
                    </Middle>
                </StyledPost>

                <DesktopCommentBlock postId={post._id} username={post.user.username} setCommentFor={showCommentForMe}/>
            </DesktopPost>
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


    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        & svg {
            display: none;
        }
    }
`


export default Post;
