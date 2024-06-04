import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Posts from './features/Posts/Posts';
import PostDetail from './features/Posts/PostDetail';
import './App.css';
import { getPosts } from './features/Posts/PostsSlice';
import { useDispatch } from 'react-redux';
import SubReddits from './features/SubReddits/SubReddits';
import { fetchSubReddits } from './features/SubReddits/SubRedditsSlice';
import Search from './features/Search/Search';

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
                    <NavigationHeader />
                    <Search />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Posts />} />
                        <Route path="/r/:subreddit" element={<Posts />} />
                        <Route path="/post/*" element={<PostDetail />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};
const NavigationHeader = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    return (
        <>
            <h1 onClick={goBack}>Reddit Posts</h1>
        </>
    );
};


export default App;
