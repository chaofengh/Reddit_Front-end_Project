// src/features/Posts/Posts.js

import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySubreddit, selectFilteredPosts, selectError, selectLoading } from './PostsSlice';
import { Link, useParams } from 'react-router-dom';
import Post from './Post';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const { subreddit } = useParams();
    const containerRef = useRef(null);

    const loadMore = useCallback(() => {
        const after = posts.length > 0 ? posts[posts.length - 1].name : null;
        if (subreddit) {
            dispatch(getPostsBySubreddit({ subreddit: `r/${subreddit}`, after }));
        } else {
            dispatch(getPosts(after));
        }
    }, [dispatch, posts, subreddit]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
                    loadMore();
                }
            }
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [loadMore, loading]);

    useEffect(() => {
        if (subreddit) {
            dispatch(getPostsBySubreddit({ subreddit: `r/${subreddit}` }));
        } else {
            dispatch(getPosts());
        }
    }, [dispatch, subreddit]);

    return (
        <div className="Posts" ref={containerRef} style={{ height: '80vh', overflowY: 'scroll' }}>
            {posts.map((post) => (
                <Link to={`/post/${post.permalink}`} key={post.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <Post post={post} />
                </Link>
            ))}
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default Posts;
