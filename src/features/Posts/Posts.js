// src/features/Posts/Posts.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts,getPostsBySubreddit,selectFilteredPosts, selectError, selectLoading } from './PostsSlice';
import { Link, useParams } from 'react-router-dom';
import Post from './Post';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    let {subreddit}= useParams()
    

    
    const loadMore = (event) => {
        event.preventDefault();
        const after = posts.length > 0 ? posts[posts.length - 1].name : null;
        if (subreddit) {
            subreddit ='r/' + subreddit
            dispatch(getPostsBySubreddit( {subreddit, after} ));
        } else {
            dispatch(getPosts(after));
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
