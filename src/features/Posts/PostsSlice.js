// src/features/Posts/PostsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../../Reddit/Reddit';

// Fetch posts from Reddit
export const getPosts = createAsyncThunk('posts/getPosts', async (after = null) => {
    const { children, after: newAfter } = await Reddit.getData(50, after);
    return { posts: children.map(post => post.data), after: newAfter };
});

// Fetch post details including comments
export const getPostDetails = createAsyncThunk('posts/getPostDetails', async (permalink) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const data = await response.json();
    const postData = data[0].data.children[0].data;
    const comments = data[1].data.children.map(child => child.data);
    return { permalink, postData, comments };
});

// Async thunk to fetch posts for a specific subreddit
export const getPostsBySubreddit = createAsyncThunk('posts/getPostsBySubreddit', async ({ subreddit, after = null }) => {
    const { children, after: newAfter } = await Reddit.fetchPostsBySubReddit({ subreddit, after });
    return { posts: children.map(post => post.data), after: newAfter };
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        postDetails: {},
        comments: {},
        currentPost: null,
        after: null,
        loading: false,
        error: null,
        filter: null
    },
    reducers: {
        clearComments: (state) => {
            state.comments = {};
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                const existingIds = new Set(state.posts.map(post => post.id));
                const newPosts = action.payload.posts.filter(post => !existingIds.has(post.id));
                state.posts = [...state.posts, ...newPosts];
                state.after = action.payload.after;
                state.loading = false;
                state.error = null;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getPostDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostDetails.fulfilled, (state, action) => {
                state.postDetails[action.payload.permalink] = action.payload.postData;
                state.comments[action.payload.permalink] = action.payload.comments;
                state.currentPost = action.payload.permalink;
                state.loading = false;
                state.error = null;
            })
            .addCase(getPostDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getPostsBySubreddit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostsBySubreddit.fulfilled, (state, action) => {
                const existingIds = new Set(state.posts.map(post => post.id));
                const newPosts = action.payload.posts.filter(post => !existingIds.has(post.id));
                state.posts = [...state.posts, ...newPosts];
                state.after = action.payload.after;
                state.loading = false;
                state.error = null;
            })
            .addCase(getPostsBySubreddit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearComments, setFilter } = postsSlice.actions;
export default postsSlice.reducer;
export const selectPosts = state => state.posts.posts;
export const selectFilteredPosts = state => {
    const filter = state.posts.filter;
    if (filter) {
        return state.posts.posts.filter(post => post.subreddit_name_prefixed === filter);
    }
    return state.posts.posts;
};
export const selectPostDetails = (state, permalink) => state.posts.postDetails[permalink];
export const selectComments = (state, permalink) => state.posts.comments[permalink];
export const selectCurrentPost = state => state.posts.currentPost;
export const selectLoading = state => state.posts.loading;
export const selectError = state => state.posts.error;