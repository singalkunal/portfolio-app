import styled from 'styled-components/macro';
// import FormInput from '../components/FormInput';
import Reply from './Reply';

import { faHeart***REMOVED*** faCaretSquareUp } from '@fortawesome/free-regular-svg-icons'
import { faHistory***REMOVED*** faHeart as fasHeart***REMOVED*** faReplyAll as fasReplyAll***REMOVED*** faThumbsUp as fasThumbsUp} from '@fortawesome/free-solid-svg-icons'
import FaIconLink from './FaIconLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledAttribute***REMOVED*** StyledAttributes } from './Attributes';

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
***REMOVED***

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
***REMOVED*** => {
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
    ***REMOVED***comment.text}
            </CommentMain>
            
            <Replies>
    ***REMOVED***
                    comment.replies.map(reply => {
                        return <Reply 
                            key={reply._id}
                            reply={reply}
                        />
    ***REMOVED***)
***REMOVED***
            </Replies>
        </StyledComment>
    )
}

export default Comment
