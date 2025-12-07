import { useState } from 'react';
import CommentForm from './CommentForm';

const CommentItem = ({ comment, currentUserId, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const canModify = currentUserId && comment.user._id === currentUserId;

    const handleUpdate = async (body) => {
        await onUpdate(comment._id, body);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            onDelete(comment._id);
        }
    };

    if (isEditing) {
        return (
            <div className="comment-item">
                <CommentForm
                    onSubmit={handleUpdate}
                    initialValue={comment.body}
                    isEditing={true}
                    onCancel={() => setIsEditing(false)}
                    isLoggedIn={true}
                />
            </div>
        );
    }

    return (
        <div className="comment-item">
            <div className="comment-header">
                <div className="comment-meta">
                    <span className="comment-author">{comment.user?.name || 'Unknown'}</span>
                    <span className="comment-date">{formatDate(comment.createDate)}</span>
                </div>
                {canModify && (
                    <div className="comment-actions">
                        <button
                            className="comment-edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="comment-delete-btn"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="comment-body">
                {comment.body.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default CommentItem;
