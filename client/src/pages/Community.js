import { useContext, useEffect, useState } from "react";
import RequireAuth from "../components/RequireAuth";
import { LiveUpdateContext } from "../contexts/LiveUpdateContext";

import useRequest from "../hooks/use-request";

import { Container } from '../styled-components/Container.style';
import Navbar from '../styled-components/Navbar';
import Post, { StyledPost } from '../styled-components/Post';


import Load from "../components/Load";
import CommentBlock from '../styled-components/CommentBlock';
import { SocketContext } from "../contexts/SocketContext";

import styled from 'styled-components/macro';

export const cssVariables = {
    minDesktopWidth: "1000px"
}
const FullPageCommentBlock = styled(CommentBlock)`
    width: max-content;
    @media only screen and (min-width: ${cssVariables.minDesktopWidth}) {
        display: none !important;
        width: 100%;
    }
`

const StyledPostWrapper = styled.div`
    height: 100%;
    width: 100%;

    padding-top: 130px;


    // small screen
    @media only screen and (max-width: ${cssVariables.minDesktopWidth}) {
        width: max-content;
        display: ${props => props.commentFor ?'none' : "block"};
    }
`

const MyContainer = styled(Container)`
    width: 100%;
`
const CommunityWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
`

const Community = () => {
    const API_URL = process.env.REACT_APP_API_BASE_URL;

    const { socket, connectSocket, handshakePending } = useContext(SocketContext);
    const { signedInUser } = useContext(LiveUpdateContext);

    const [posts, setPosts] = useState([]);
    const [postsById, setPostsById] = useState({});

    const [loading, setLoading] = useState(true);

    const [commentFor, setCommentFor] = useState(null);


    const triggerCustomEvent2 = () => {
        socket.emit('post-comment', '60edf74d2e60276eed250130', 'Needed a change', (obj) => {
            
            if(obj.err) {
                
            }
        });
    }

    const { doRequest: getPosts, errors: getPostsErrors } = useRequest({
        url: `${API_URL}/api/post/get`,
        method: 'get'
    });

    useEffect(() => {
        const fetchPosts = async () => {

            await connectSocket();

            const res = await getPosts();
            
            if(res) {
                
                setLoading(false);
                setPosts(res.posts);
                res.posts.map(post => {
                    setPostsById(prev => {
                        return {
                            ...prev,
                            [post._id]: post
                        }
                    })
                })

            }

            else {
                setLoading(false);
            }
        };

        fetchPosts();

        

    }, []);


    useEffect(() => {
        if(!handshakePending && socket) {

            socket.on('post-comment', data => {
                const postedComment = data.comment;
                // 
                setPostsById(prev => {
                    const pid = postedComment.commentedOn;
                    return {
                        ...prev,
                        [pid]: {
                            ...prev[pid],
                            commentsCount: prev[pid].commentsCount + 1
                        }
                    }
                })
            })

            socket.on('toggle-like-post', data => {
                var {like: t_like, userId: t_userId, postId: t_postId } = data;

                setPostsById(prev => {
                    var {likesCount, likes, liked } = prev[t_postId];
                    if(t_like>0) {
                        likes = [...likes, t_userId]
                    }
                    else {
                        likes = likes.filter(_id => _id !== t_userId);
                    }

                    return {
                        ...prev,
                        [t_postId]: {
                            ...prev[t_postId],
                            likesCount: likesCount + t_like,
                            likes,
                            liked: ((liked && (t_userId !== signedInUser._id)) || (!liked && (t_userId === signedInUser._id)))
                        }
                    }
                })
            })

            socket.on('delete-comment', data => {
                
                if(data.comment) {
                    const pid = data.comment.commentedOn;
                    setPostsById(prev => {
                        return {
                            ...prev,
                            [pid]: {
                                ...prev[pid],
                                commentsCount: prev[pid]['commentsCount']-1,
                                comments: prev[pid]['comments'].filter(id => id !== data.comment._id)
                            }
                        }
                    })
                }
            })
        }

    }, [handshakePending]);



    return (
        <Load loading={loading || handshakePending}>
            <RequireAuth>
                <CommunityWrapper>
                    {
                        commentFor
                        ?
                        <FullPageCommentBlock postId={commentFor.postId} username={commentFor.username} setCommentFor={setCommentFor} />
                        :
                        <Navbar />
                    }

                    <StyledPostWrapper commentFor = {commentFor} >
                        <MyContainer>
                            {
                                Object.entries(postsById).map(([_, post]) => {
                                    return <Post 
                                            post={post}
                                            key={post._id}
                                            onComment={triggerCustomEvent2}
                                            showCommentForMe={setCommentFor}
                                        />
                                })

                            }
                        </MyContainer>
                    </StyledPostWrapper>
                </CommunityWrapper>
            </RequireAuth>

        </Load>
    )
}

export default Community
