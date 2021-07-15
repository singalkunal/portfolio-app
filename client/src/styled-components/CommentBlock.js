import { useEffect***REMOVED*** useState } from 'react';
import { useParams***REMOVED***useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';


import useRequest from '../hooks/use-request';

import Comment from './Comment';
import {StyledFormInput} from '../styled-components/FormInput';

import { Container } from './Container.style';
import Navbar from './Navbar';

import { faBackward } from '@fortawesome/free-solid-svg-icons'

const CommentInput = styled(StyledFormInput)`
    width: 100%;
    max-width: 360px;
    position: fixed;

    margin: 0;
    padding: 10px 0 20px;
    top: 0;
    z-index: 10;
    background-color: white;

    border-bottom: 2px solid #c4c4c4;
`
const MyContainer = styled(Container)`
    display: block;
    margin-top: 100px;

    position: sticky;
    background-color: white;
    &.transition-enter {
        opacity: 0;
***REMOVED***

    &.transition-enter-active {
        transition: opacity 1000ms ease-in-out;
        opacity: 1;
***REMOVED***
`

const CommentBlockWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 360px;

`

const CommentBlock = ({postId***REMOVED*** setCommentFor***REMOVED*** => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;
    // const { postId } = useParams();
    const [comments***REMOVED*** setComments] = useState([]);
    const history = useHistory();

    const { doRequest: getComments***REMOVED*** errors } = useRequest({
        url: `${API_URL}/api/comments/${postId}`***REMOVED***
        method: 'get'
***REMOVED***);

    useEffect(() => {
        
        const fetchComments = async () => {
            const res = await getComments();
            if(res) {
                setComments(res.comments);

***REMOVED***
    ***REMOVED***

        fetchComments();
        return ()  => {
            setCommentFor(null);
    ***REMOVED***
***REMOVED******REMOVED*** []);

    useEffect(() => {
        window.scrollTo(0***REMOVED***0);
***REMOVED***);

    return (
        <>
        <MyContainer>
            <CommentInput
                label="Add Comment"
                labelRightIcon={faBackward}
                labelRightOnClick={() => setCommentFor(null)}
                placeholder="Comment"
                rightText="POST"
            />
            
            <CommentBlockWrapper>
    ***REMOVED***
                    comments.map(comment => {
                        // {console.log('mapping '***REMOVED*** comment)}
                        return <Comment 
                            key={comment._id}
                            comment={comment}
                        />
    ***REMOVED***)
***REMOVED***
            </CommentBlockWrapper>
        </MyContainer>

        </>

    )
}

export default CommentBlock
