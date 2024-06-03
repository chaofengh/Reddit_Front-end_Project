// src/features/Search/Search.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../Posts/PostsSlice';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        event.preventDefault();
        if (query.trim() !== '') {
            dispatch(searchPosts(query));
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
