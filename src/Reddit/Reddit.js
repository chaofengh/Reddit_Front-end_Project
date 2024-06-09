// src/api/Reddit.js

const BASE_URL = 'https://www.reddit.com';

const Reddit = {
    async getData(limit = 50, after = null) {
        let url = `${BASE_URL}/r/popular.json?limit=${limit}&raw_json=1`;
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
        const response = await fetch(`${BASE_URL}/subreddits/popular.json?raw_json=1`);
        const data = await response.json();
        return data.data.children.map(sub => sub.data);
    },
    async searchPosts(query) {
        const response = await fetch(`${BASE_URL}/search.json?q=${query}&limit=50&raw_json=1`);
        const data = await response.json();
        return data.data.children.map(post => post.data);
    },

    async getPostInfo(permalink){
        const response = await fetch(`${BASE_URL}${permalink}.json?raw_json=1`);
        const data = await response.json();
        return data
    }
    
};

export default Reddit;
