// src/api/Reddit.js

const BASE_URL = 'https://www.reddit.com';

const Reddit = {
    async getData(limit = 50, after = null) {
        let url = `${BASE_URL}/r/popular.json?limit=${limit}`;
        if (after) {
            url += `&after=${after}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    },
    async fetchPostsBySubReddit({subreddit, limit = 50, after = null}) {
        let url = `${BASE_URL}/${subreddit}.json?limit=${limit}`;
        if (after) {
            url += `&after=${after}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    },
    async fetchSubReddits() {
        const response = await fetch(`${BASE_URL}/subreddits/popular.json`);
        const data = await response.json();
        return data.data.children.map(sub => sub.data);
    },
    async searchPosts(query) {
        const response = await fetch(`${BASE_URL}/search.json?q=${query}&limit=50`);
        const data = await response.json();
        return data.data.children.map(post => post.data);
    }
    
};

export default Reddit;
