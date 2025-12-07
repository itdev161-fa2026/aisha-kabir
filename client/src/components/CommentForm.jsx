import { useState } from 'react';
import { Link } from 'react-router-dom';

const CommentForm = ({ onSubmit, initialValue = '', isEditing = false, onCancel, isLoggedIn }) => {
    const [body, setBody] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isLoggedIn) {
        return (
            <p className="login-prompt">
                <Link to="/login">Log in</Link> to leave a comment.
            </p>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!body.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        if (body.length > 500) {
            setError('Comment must be 500 characters or less');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await onSubmit(body);
            if (!isEditing) {
                setBody('');
            }
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Failed to submit comment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a comment..."
                maxLength={500}
                disabled={loading}
            />
            <div className="comment-form-actions">
                <button
                    type="submit"
                    className="comment-submit-btn"
                    disabled={loading || !body.trim()}
                >
                    {loading ? 'Submitting...' : isEditing ? 'Save' : 'Post Comment'}
                </button>
                {isEditing && onCancel && (
                    <button
                        type="button"
                        className="comment-cancel-btn"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                )}
            </div>
            {error && <p className="comment-error">{error}</p>}
        </form>
    );
};

export default CommentForm;
