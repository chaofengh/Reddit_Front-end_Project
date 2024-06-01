// src/features/SubReddits/SubReddits.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubReddits, selectSubReddits, selectLoading, selectError } from './SubRedditsSlice';
import './SubReddits.css';
import { useNavigate } from 'react-router-dom';
import { getPostsBySubreddit } from '../Posts/PostsSlice';

const SubReddits = () => {
    const dispatch = useDispatch();
    const subReddits = useSelector(selectSubReddits);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSubReddits());
    }, [dispatch]);

    const handleClick = (subreddit) => {
        dispatch(getPostsBySubreddit({subreddit}))
        navigate(`${subreddit}`);
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
