// src/features/Search/Search.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts,setFilter } from '../Posts/PostsSlice';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (query.trim() !== '') {
            dispatch(setFilter(null));
            dispatch(searchPosts(query));
            navigate('/')

        }
    };

    return (
        <div className="Search">
            <form onSubmit={handleSearch} className = 'Search_form'>      
                    <span 
                        className="material-symbols-outlined">
                            search
                    </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Reddit Posts"
                />
            </form>
        </div>
    );
};

export default Search;
