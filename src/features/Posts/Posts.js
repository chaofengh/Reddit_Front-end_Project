// src/features/Posts/Posts.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts,getPostsBySubreddit,selectFilteredPosts,setFilter, selectError, selectLoading } from './PostsSlice';
import { Link, useParams } from 'react-router-dom';
import Post from './Post';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const {subreddit}= useParams()


    useEffect(() => {
        if (subreddit) {
            // dispatch(setFilter(subreddit));
            dispatch(getPostsBySubreddit(subreddit));
        } else {
            dispatch(getPosts());
        }
    }, [dispatch,subreddit]); 
    
    const loadMore = (event) => {
        event.preventDefault();
        if (subreddit) {
            dispatch(getPostsBySubreddit({ subreddit, after: posts.length }));
        } else {
            dispatch(getPosts());
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="Posts">
            {posts.map((post) => (
                <Link to={`/post/${post.permalink}`} key={post.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <Post post={post} />
                </Link>
            ))}
            <button onClick={loadMore}>Load More</button>
        </div>
    );
};

export default Posts;
