import { useEffect, useState, useContext, useRef } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';


import useRequest from '../hooks/use-request';

import Comment from './Comment';
import {StyledFormInput} from '../styled-components/FormInput';

import { Container } from './Container.style';
import Navbar from './Navbar';

import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { SocketContext } from '../contexts/SocketContext';
import useForm from '../hooks/use-form';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';


const cssVariables = {
    minDesktopWidth: "1000px",
}

export const CommentInput = styled(StyledFormInput)`
    width: 100%;
    max-width: 360px;
    position: fixed;

    margin: 0;
    padding: 10px 0 20px;
    top: 0;
    z-index: 10;
    background-color: white;

    border-bottom: 2px solid #c4c4c4;

    & input {
        padding-right: 40px !important;
    }

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        position: static;
        max-width: unset;
        width: 95%;
    }
`
const MyContainer = styled(Container)`
    display: block;
    margin-top: 100px;

    margin-right: 0;
    position: sticky;
    background-color: white;
    &.transition-enter {
        opacity: 0;
    }

    &.transition-enter-active {
        transition: opacity 1000ms ease-in-out;
        opacity: 1;
    }

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        margin-top: 0;
    }
`

const CommentBlockWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 360px;

    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        max-width: unset;
        width: 95%;
    }

`

const CommentBlock = ({postId, username, setCommentFor, className}) => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    // const { postId } = useParams();

    const { socket } = useContext(SocketContext);
    const { signedInUser } = useContext(LiveUpdateContext);

    const [commentsById, _setCommentsById] = useState({});
    const commentsByIdRef = useRef(commentsById); // use only ref inside (socketio) event listeners
    const setCommentsById = (inp) => {
        // update ref using function
        if(inp instanceof Function) {
            commentsByIdRef.current = inp(commentsByIdRef.current);
        }
        else {  // update ref using value
            commentsByIdRef.current = inp;
        }

        _setCommentsById(commentsByIdRef.current);
    }
    const [replyFor, setReplyFor] = useState(null);

    const history = useHistory();

    const { 
        values,
        handleChange,
        handleSubmit
     } = useForm({
        initialValues: {
            'text': ""
        },
        requiredValues:['text'],
        onSubmit: () => {
            console.log('Submitting comment... ', values);
            
            if(replyFor) {
                socket.emit('reply-comment', replyFor.commentId, values.text, obj => {
                    if(!obj) {
                        console.log('Error')
                    }
                })

                setReplyFor(null);
            }
            else {
                socket.emit('post-comment', postId, values.text, obj => {
                    if(!obj) {
                        console.log('Error');
                    }
    
                })
            }


            return true;
        }
    })

    const { doRequest: getComments, errors } = useRequest({
        url: `${API_URL}/api/comments/${postId}`,
        method: 'get'
    });

    const onBack = () => {
        replyFor ? setReplyFor(null) : setCommentFor(null);
    };
    useEffect(() => {
        
        const fetchComments = async () => {
            const res = await getComments();
            if(res) {
                res.comments.map(comment => {
                    setCommentsById(prev => {
                        return {
                            ...prev,
                            [comment._id]: comment
                        }
                    })
                })

            }
        }

        fetchComments();
        

        socket.on('post-comment', data => {
            if(!data || !data.comment) return;
            if(postId === data.comment.commentedOn) {
                setCommentsById(prev => {
                    return {[data.comment._id]: data.comment, ...prev}
                });
            }
            
        })

        socket.on('toggle-like-comment', data => {
            var {like: t_like, userId: t_userId, commentId: t_commentId } = data;
            
            if(!Object.keys(commentsByIdRef.current).includes(t_commentId)) {
                return ;
            }
            setCommentsById(prev => {
                console.log(t_commentId, typeof(t_commentId), Object.keys(prev));

                var {likesCount, likes, liked } = prev[t_commentId];

                if(t_like>0) {
                    likes = [...likes, t_userId]
                }
                else {
                    likes = likes.filter(_id => _id !== t_userId);
                }
    
                return {
                    ...prev,
                    [t_commentId]: {
                        ...prev[t_commentId],
                        likesCount: likesCount + t_like,
                        likes,
                        liked: ((liked && (t_userId !== signedInUser._id)) || (!liked && (t_userId === signedInUser._id)))
                    }
                }
            });

        })

        socket.on('reply-comment', data => {
            if(!Object.keys(commentsByIdRef.current).includes(data.commentId)) {
                return;
            }
            setCommentsById(prev => {
                const cl = [...prev[data.commentId].replies, data.reply]
                return {
                    ...prev,
                    [data.commentId]: {
                        ...prev[data.commentId],
                        replies: cl
                    }
                }
            })
        })

        socket.on('delete-comment', data => {
            if(data.comment) {
                // const id = data.comment._id
                setCommentsById(prev => {
                    delete prev[data.comment._id];
                    return {...prev};
                });
            }
        })

        window.scrollTo(0,0);
        return ()  => {
            setCommentFor(null);
        }
    }, []);


    return (
        <>
        <MyContainer className={className}>
            <CommentInput
                label={replyFor ? `Reply to @${replyFor.username}` : `Add Comment` }
                labelRightIcon={faBackward}
                labelRightOnClick={() => onBack()}
                placeholder={replyFor ? 'Reply' : `Comment for @${username}'s post`}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                name='text'
                value={values.text}
                rightText="POST"
            />
            
            <CommentBlockWrapper>
                {
                    Object.entries(commentsById).map(([_, comment]) => {
                        if(comment._id === "60f0928acff6522b052fc173") {
                            console.log(_, comment._id)

                        }
                        return <Comment 
                            key={comment._id}
                            comment={comment}
                            setReplyFor={setReplyFor}
                        />
                    })
                }
            </CommentBlockWrapper>
        </MyContainer>

        </>

    )
}

export default CommentBlock
