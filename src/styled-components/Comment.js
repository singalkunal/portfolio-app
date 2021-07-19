import styled from 'styled-components/macro';
// import FormInput from '../components/FormInput';
import Reply from './Reply';

import { faHeart, faTrashAlt, faCaretSquareUp } from '@fortawesome/free-regular-svg-icons'
import { faHistory, faHeart as fasHeart, faReplyAll as fasReplyAll, faThumbsUp as fasThumbsUp} from '@fortawesome/free-solid-svg-icons'
import FaIconLink from './FaIconLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledAttribute, StyledAttributes } from './Attributes';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketContext';

import moment from 'moment';
import { LiveUpdateContext } from '../contexts/LiveUpdateContext';

const StyledComment = styled.div`
    max-width: 100%;

    padding: 22px 0;
    border-bottom: 1px solid #c4c4c4;
`
const CommentHead = styled.div`
    display: flex;
    align-items: center;

    & span {
        font-size: 14px;
        font-weight: 600;
        /* border-bottom: 1px solid #121212; */
    }

    & svg:nth-of-type(2){
        margin-left: auto;
        font-weight: 300;
    }
`

const CommentAttributes = styled(StyledAttributes)`
    justify-content: flex-start;
    padding-left: 24px;
`

const CommentMain = styled.main`
    font-size: 13px;
`

const ReplyButton = styled.div`
    color: black;
    background-color: #c4c4c4;
    width: fit-content;
    padding: 0 15px;
    font-size: 12px;
    border-radius: 5px;
    margin: 5px 0;

    cursor: pointer;
`
const Replies = styled.div`
    padding-left: 14px;
    /* margin-bottom: 20px; */
`

const Comment = ({
    comment,
    setReplyFor,
}) => {

    const { socket } = useContext(SocketContext);
    const { signedInUser } = useContext(LiveUpdateContext);

    const onLike = (event) => {
        event.preventDefault();
 
        
        socket.emit('toggle-like-comment', comment._id, obj => {
            if(!obj) {
                
            }
        })
    };

    const onReply = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setReplyFor({username: comment.commentedBy.username, commentId: comment._id});
        // socket.emit('reply-comment', comment._id, )
    }

    const onDeleteComment = (event) => {
        event.preventDefault();
        event.stopPropagation();

        socket.emit('delete-comment', comment._id, obj => {
            if(!obj) {
                
            }
        })
    }

    useEffect(() => {
        if(comment._id === "60f0928acff6522b052fc173") {
            
        }
        return () => {
            setReplyFor(null);
        }
    }, []);

    // 
    return (
        
        <StyledComment>
            <CommentHead>
                <FontAwesomeIcon 
                    icon={comment.liked ? fasHeart : faHeart}
                    onClick={onLike}
                    style={{cursor: 'pointer'}}
                />
                <span>&#64;{comment.commentedBy.username}</span>
                {
                    signedInUser._id === comment.commentedBy._id
                    &&
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{cursor: 'pointer'}}
                        onClick={onDeleteComment}
                    />
                }
            </CommentHead>
            <CommentAttributes>
                <StyledAttribute
                    icon={fasThumbsUp}
                    label={comment.likesCount}
                    fontSize="13px"
                    noLink
                />

                <StyledAttribute
                    icon={fasReplyAll}
                    label={comment.repliesCount}
                    fontSize="13px"
                    noLink
                />

                <StyledAttribute
                    icon={faHistory}
                    label={moment.unix(comment.createdAt).fromNow() || 'Some time ago'}
                    fontSize="13px"
                    noLink
                />
            </CommentAttributes>

            <CommentMain>
                {comment.text}
            </CommentMain>
            
            <ReplyButton onClick={onReply}>
                <span>Reply</span>
            </ReplyButton>
            {/* <hr /> */}
            <Replies>
                {
                    comment.replies.map(reply => {
                        return <Reply 
                            key={reply._id}
                            reply={reply}
                        />
                    })
                }
            </Replies>
        </StyledComment>
    )
}

export default Comment
