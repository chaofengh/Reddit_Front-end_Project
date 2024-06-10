// src/features/Posts/PostDetail.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPostDetails,
    selectPostDetails,
    selectCurrentPost,
    selectComments,
    selectLoading,
    selectError,
} from './PostsSlice';
import './PostDetail.css';
import { useScroll } from '../../utility/ScrollContext';
import Comment from './Comments/Comment';

const PostDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const permalink = location.pathname.replace('/post', '');
    const postDetails = useSelector((state) => selectPostDetails(state, permalink));
    const comments = useSelector((state) => selectComments(state, permalink)) || [];
    const currentPost = useSelector(selectCurrentPost);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const { scrollPosition } = useScroll();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    

    useEffect(() => {
        if (permalink && permalink !== currentPost) {
            dispatch(getPostDetails(permalink));
        }
    }, [dispatch, permalink, currentPost]);

    const goBack = () => {
        navigate('/');
        setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 0);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % Object.values(postDetails.media_metadata).length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + Object.values(postDetails.media_metadata).length) % Object.values(postDetails.media_metadata).length);
    };

    const renderMedia = () => {
        if (postDetails.is_video) {
            return (
                <video
                    src={postDetails.media.reddit_video.fallback_url}
                    controls
                    autoPlay
                    muted
                    loop
                />
            );
        } else if (postDetails.media_metadata) {
            const mediaArray = Object.values(postDetails.media_metadata);
            const currentMedia = mediaArray[currentImageIndex];
            return (
                <div className="gallery">
                        <button className="nav-button prev" onClick={prevImage}>❮</button>
                        <img
                            src={currentMedia.s.u}
                            alt={postDetails.title}
                            className="gallery-image"
                        />
                        <button className="nav-button next" onClick={nextImage}>❯</button>
                </div>
            );
        } else if (postDetails.preview){
            return(
                <img
                    src = {postDetails.preview.images[0].source.url}
                    alt = 'ken'
                />
            );
        } 
        return null;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="PostDetail">
            <button onClick={goBack} className ='backButton' >Back</button>
            {postDetails && (
                <div className="PostInfo">
                    <h2>{postDetails.title}</h2>
                    {renderMedia()}
                    <p>{postDetails.selftext}</p>
                    <div className="indicators">
                        <div className="Votes">
                            <span className="material-symbols-outlined">trending_up</span>
                            <span>{postDetails.ups}</span>
                        </div>
                        <div className="Comment_Count">
                            <span className="material-symbols-outlined">comment</span>
                            <span>{postDetails.num_comments}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="Comments">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
