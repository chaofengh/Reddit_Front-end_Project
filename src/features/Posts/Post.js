import React from 'react';
import './Posts.css';

const Post = ({ post }) => {
    const isVideo = post.secure_media && post.secure_media.reddit_video;
    const previewImage = post.preview?.images?.[0]?.source?.url;


    return (
        <div className="Post">
            <h2>{post.title}</h2>
            {isVideo ? (
                <video
                    src={post.secure_media.reddit_video.fallback_url}
                    controls
                />
            ) : previewImage ? (
                <img
                    src={previewImage}
                    alt='Preview'
                />
            ) : null
            }
            <div className='indicators'>
                <div className='Votes'>
                    <span className="material-symbols-outlined">trending_up</span>
                    <span>{post.ups}</span>
                </div>
                <div className='Comment_Count'>
                    <span className="material-symbols-outlined">comment</span>
                    <span>{post.num_comments}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
