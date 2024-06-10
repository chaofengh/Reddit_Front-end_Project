// src/features/Posts/Comments/Comment.js

import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
    // Regex to check for URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const imageRegex = /\.(jpeg|jpg|gif|png|webp|bmp)(\?.*)?$/i;

    const renderContent = () => {
        if (!comment.body) return null;
        return comment.body.split(urlRegex).map((part, index) => {
            if (urlRegex.test(part) && imageRegex.test(part)) {
                return <img key={index} src={part} alt="comment content" className="CommentImage" />;
            } else if (urlRegex.test(part)) {
                return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <div className="Comment">
            {renderContent()}
            {comment.replies && comment.replies.data.children.map(reply => (
                reply.kind === 't1' && <Comment key={reply.data.id} comment={reply.data} />
            ))}
        </div>
    );
};

export default Comment;
