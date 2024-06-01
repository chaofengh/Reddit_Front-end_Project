// src/features/SubReddits/SubRedditsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../../Reddit/Reddit';

// Async thunk to fetch subreddits
export const fetchSubReddits = createAsyncThunk('subReddits/fetchSubReddits', async () => {
    const subReddits = await Reddit.fetchSubReddits();
    return subReddits;
});

const subRedditsSlice = createSlice({
    name: 'subReddits',
    initialState: {
        subReddits: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubReddits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubReddits.fulfilled, (state, action) => {
                state.loading = false;
                state.subReddits = action.payload;
            })
            .addCase(fetchSubReddits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectSubReddits = (state) => state.subReddits.subReddits;
export const selectLoading = (state) => state.subReddits.loading;
export const selectError = (state) => state.subReddits.error;

export default subRedditsSlice.reducer;
