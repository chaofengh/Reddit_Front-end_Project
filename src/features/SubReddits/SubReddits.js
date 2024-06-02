// src/features/SubReddits/SubReddits.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubReddits, selectLoading, selectError } from './SubRedditsSlice';
import './SubReddits.css';
import { useNavigate } from 'react-router-dom';
import { getPostsBySubreddit,setFilter,clearSearchResult } from '../Posts/PostsSlice';

const SubReddits = () => {
    const dispatch = useDispatch();
    const subReddits = useSelector(selectSubReddits);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const navigate = useNavigate();

    const handleClick = (subreddit) => {
        dispatch(clearSearchResult())
        dispatch(setFilter(subreddit));
        dispatch(getPostsBySubreddit({subreddit}))
        navigate(subreddit);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="SubReddits">
            <h2>Popular SubReddits</h2>
            <ul>
                {subReddits.map(sub => (
                    <li key={sub.id} onClick={() => handleClick(sub.display_name_prefixed)}>
                         <img 
                            src={sub.icon_img || 'https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png'}  
                            alt={`${sub.display_name_prefixed} logo`} className="subreddit-logo" />
                        {sub.display_name_prefixed}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubReddits;
