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
                return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="CommentLink">{part}</a>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <div className="Comment">
            <div className="CommentAuthor">{comment.author}</div>
            <div className="CommentBody">{renderContent()}</div>
            <div className="CommentMeta">
                <span>{new Date(comment.created_utc * 1000).toLocaleString()}</span>
                <span>{comment.ups} upvotes</span>
            </div>
            {comment.replies && comment.replies.data.children.map(reply => (
                reply.kind === 't1' && <Comment key={reply.data.id} comment={reply.data} />
            ))}
        </div>
    );
};

export default Comment;
