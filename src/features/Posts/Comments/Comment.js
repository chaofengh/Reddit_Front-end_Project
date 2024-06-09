import React from 'react';
const Comment = ({ comment }) => {
    
    return (
        <div className="Comment">
            <p>{comment.body}</p>
            {comment.replies && comment.replies.data.children.map(reply => (
                reply.kind === 't1' && <Comment key={reply.data.id} comment={reply.data} />
            ))}
        </div>
    );
};

export default Comment;