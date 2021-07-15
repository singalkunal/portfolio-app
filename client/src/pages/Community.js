import {socket} from '../service/socket';

import { useContext***REMOVED*** useEffect***REMOVED*** useState } from "react";
import RequireAuth from "../components/RequireAuth";
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";

import useRequest from "../hooks/use-request";

import { Container } from '../styled-components/Container.style';
import Navbar from '../styled-components/Navbar';
import Post***REMOVED*** { StyledPost } from '../styled-components/Post';


import Load from "../components/Load";
import styled from "styled-components/macro";
import { useLocation } from "react-router";
import CommentBlock from '../styled-components/CommentBlock';

const Community = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const [posts***REMOVED*** setPosts] = useState([]);
    const [loading***REMOVED*** setLoading] = useState(true);

    const [commentFor***REMOVED*** setCommentFor] = useState(null);

    const location = useLocation();

    const triggerCustomEvent = () => {
        socket.emit('custom-event'***REMOVED*** 123);
***REMOVED***
    const triggerCustomEvent2 = () => {
        socket.emit('custom-event2'***REMOVED*** 456);
***REMOVED***

    const { doRequest: getPosts***REMOVED*** errors: getPostsErrors } = useRequest({
        url: `${API_URL}/api/post/get`***REMOVED***
        method: 'get'
***REMOVED***);

    const {doRequest: openSocket***REMOVED*** errors: openSocketErrors } = useRequest({
        url: API_URL+'/api/users/opensocket'***REMOVED***
        method: 'get'
***REMOVED***);

    useEffect(() => {
        // const socket = io(API_URL);
        const fetchPosts = async () => {

            /* ******** handshake ************ */
            // user can only like/comment/reply if handshake
            // is successful

            const ack = await openSocket();
            socket.emit('set-session'***REMOVED*** ack.jwt);

            const res = await getPosts();
            
            if(res) {
                
                setLoading(false);
                setPosts(res.posts);
***REMOVED***
    ***REMOVED***;

        fetchPosts();
***REMOVED******REMOVED*** [])
    return (
        <Load loading={loading}>

            <RequireAuth>
    ***REMOVED***
                    commentFor
                    ?
                    <CommentBlock postId={commentFor} setCommentFor={setCommentFor} />
                    :
                    <>
                        <Navbar />
                        <Container>
                ***REMOVED***
                                posts.map(post => {
                                    return <Post 
                                            post={post}
                                            key={post._id}
                                            onLike={triggerCustomEvent}
                                            onComment={triggerCustomEvent2}
                                            showCommentForMe={setCommentFor}
                                        />
                ***REMOVED***)

            ***REMOVED***
                        </Container>
                    </>
***REMOVED***
            </RequireAuth>

        </Load>
    )
}

export default Community
