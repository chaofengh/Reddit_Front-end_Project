import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/Posts/PostsSlice';
import subRedditsReducer from './features/SubReddits/SubRedditsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        subReddits: subRedditsReducer,  // Ensure this key matches the expected state structure
    },
});
