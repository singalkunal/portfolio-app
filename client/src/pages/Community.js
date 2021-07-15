import {socket} from '../service/socket';

import { useContext, useEffect, useState } from "react";
import RequireAuth from "../components/RequireAuth";
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";

import useRequest from "../hooks/use-request";

import { Container } from '../styled-components/Container.style';
import Navbar from '../styled-components/Navbar';
import Post, { StyledPost } from '../styled-components/Post';


import Load from "../components/Load";
import styled from "styled-components/macro";
import { useLocation } from "react-router";
import CommentBlock from '../styled-components/CommentBlock';

const Community = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [commentFor, setCommentFor] = useState(null);

    const location = useLocation();

    const triggerCustomEvent = () => {
        socket.emit('custom-event', 123);
    }
    const triggerCustomEvent2 = () => {
        socket.emit('custom-event2', 456);
    }

    const { doRequest: getPosts, errors: getPostsErrors } = useRequest({
        url: `${API_URL}/api/post/get`,
        method: 'get'
    });

    const {doRequest: openSocket, errors: openSocketErrors } = useRequest({
        url: API_URL+'/api/users/opensocket',
        method: 'get'
    });

    useEffect(() => {
        // const socket = io(API_URL);
        const fetchPosts = async () => {

            /* ******** handshake ************ */
            // user can only like/comment/reply if handshake
            // is successful

            const ack = await openSocket();
            socket.emit('set-session', ack.jwt);

            const res = await getPosts();
            
            if(res) {
                
                setLoading(false);
                setPosts(res.posts);
            }
        };

        fetchPosts();
    }, [])
    return (
        <Load loading={loading}>

            <RequireAuth>
                {
                    commentFor
                    ?
                    <CommentBlock postId={commentFor} setCommentFor={setCommentFor} />
                    :
                    <>
                        <Navbar />
                        <Container>
                            {
                                posts.map(post => {
                                    return <Post 
                                            post={post}
                                            key={post._id}
                                            onLike={triggerCustomEvent}
                                            onComment={triggerCustomEvent2}
                                            showCommentForMe={setCommentFor}
                                        />
                                })

                            }
                        </Container>
                    </>
                }
            </RequireAuth>

        </Load>
    )
}

export default Community
