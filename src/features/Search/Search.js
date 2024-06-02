// src/features/Search/Search.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../Posts/PostsSlice';

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
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Reddit posts"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;
