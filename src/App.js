import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './features/Posts/Posts';
import PostDetail from './features/Posts/PostDetail';
import './App.css';
import { getPosts } from './features/Posts/PostsSlice';
import { useDispatch } from 'react-redux';
import SubReddits from './features/SubReddits/SubReddits';
import {fetchSubReddits} from './features/SubReddits/SubRedditsSlice';
const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        dispatch(fetchSubReddits());
        
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <SubReddits />
                <header className="App-header">
                    <h1>Reddit Posts</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Posts/>} />
                        <Route path="/r/:subreddit" element={<Posts />} />
                        <Route path="/post/*" element={<PostDetail />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
