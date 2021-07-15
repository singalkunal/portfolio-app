import styled from 'styled-components/macro';

const StyledReply = styled.div`
    margin: 20px;
`

const ReplyHead = styled.div`
    display: flex;
    align-items: center;

    & span {
        font-size: 13px;
    }
`

const ReplyMain = styled.main`
    font-size: 13px;
    padding-left: 10px;
    border-left: 2px solid #c4c4c4;
`
const Reply = ({
    reply
}) => {
    return (
        <StyledReply>
            <ReplyHead>
                <span>&#64; {reply.repliedBy.username}</span>
            </ReplyHead>

            <ReplyMain>
                {reply.text}
            </ReplyMain>
        </StyledReply>
    )
}

export default Reply
