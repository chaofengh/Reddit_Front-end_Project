// src/features/Posts/PostDetail.js

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, selectPostDetails, selectCurrentPost, selectComments, selectLoading, selectError } from './PostsSlice';
import './PostDetail.css';  // Import the CSS file

const PostDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const permalink = location.pathname.replace('/post', '');
    const postDetails = useSelector(state => selectPostDetails(state, permalink));
    const comments = useSelector(state => selectComments(state, permalink)) || [];
    const currentPost = useSelector(selectCurrentPost);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        if (permalink && permalink !== currentPost) {
            dispatch(getPostDetails(permalink));
        }
    }, [permalink, currentPost, dispatch]);

    const goBack = () => {
        navigate('/');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="PostDetail">
            <button onClick={goBack}>Back</button>
            {postDetails && (
                <div>
                    <h2>{postDetails.title}</h2>
                    {postDetails.is_video ? (
                        <video src={postDetails.media.reddit_video.fallback_url} controls autoPlay muted loop></video>
                    ) : (
                        <img src={postDetails.url_overridden_by_dest || postDetails.url} alt={postDetails.title} />
                    )}
                    <p>{postDetails.selftext}</p>
                    <div className="indicators">
                        <div className="Votes">
                            <span className="material-symbols-outlined">trending_up</span>
                            <span>{postDetails.ups}</span>
                        </div>
                        <div className="Comments">
                            <span className="material-symbols-outlined">comment</span>
                            <span>{postDetails.num_comments}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="Comments">
                {comments.map(comment => (
                    <div key={comment.id}>
                        <p className="Comment">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
