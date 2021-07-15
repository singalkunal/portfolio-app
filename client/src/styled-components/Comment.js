import styled from 'styled-components/macro';
// import FormInput from '../components/FormInput';
import Reply from './Reply';

import { faHeart, faCaretSquareUp } from '@fortawesome/free-regular-svg-icons'
import { faHistory, faHeart as fasHeart, faReplyAll as fasReplyAll, faThumbsUp as fasThumbsUp} from '@fortawesome/free-solid-svg-icons'
import FaIconLink from './FaIconLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledAttribute, StyledAttributes } from './Attributes';

const StyledComment = styled.div`
    max-width: 100%;

    margin-bottom: 45px;
    /* border-bottom: 1px solid #c4c4c4; */
`
const CommentHead = styled.div`
    display: flex;
    align-items: center;

    & span {
        font-size: 14px;
        font-weight: 500;
    }

`

const CommentAttributes = styled(StyledAttributes)`
    justify-content: flex-start;
    padding-left: 24px;
`

const CommentMain = styled.main`
    font-size: 13px;
`

const Replies = styled.div`
    padding-left: 14px;
    /* margin-bottom: 20px; */
`

const Comment = ({
    comment
}) => {
    return (
        <StyledComment>
            <CommentHead>
                <FontAwesomeIcon 
                    icon={comment.liked ? fasHeart : faHeart}
                />
                <span>&#64;{comment.commentedBy.username}</span>
            </CommentHead>
            <CommentAttributes>
                <StyledAttribute
                    icon={fasThumbsUp}
                    label={comment.likesCount}
                    fontSize="13px"
                />

                <StyledAttribute
                    icon={fasReplyAll}
                    label={comment.repliesCount}
                    fontSize="13px"
                />

                <StyledAttribute
                    icon={faHistory}
                    label={comment.updatedAt || "22m ago"}
                    fontSize="13px"
                />
            </CommentAttributes>

            <CommentMain>
                {comment.text}
            </CommentMain>
            
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
