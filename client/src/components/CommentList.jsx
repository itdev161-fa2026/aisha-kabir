import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { getComments, createComment, updateComment, deleteComment } from '../services/api';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import './Comments.css';

const CommentList = ({ postId }) => {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const data = await getComments(postId);
                setComments(data);
                setError(null);
            } catch (err) {
                setError('Failed to load comments');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleCreate = async (body) => {
        const newComment = await createComment(postId, body);
        setComments([newComment, ...comments]);
    };

    const handleUpdate = async (commentId, body) => {
        const updatedComment = await updateComment(commentId, body);
        setComments(comments.map(c =>
            c._id === commentId ? updatedComment : c
        ));
    };

    const handleDelete = async (commentId) => {
        await deleteComment(commentId);
        setComments(comments.filter(c => c._id !== commentId));
    };

    return (
        <section className="comments-section">
            <h3>Comments ({comments.length})</h3>

            <CommentForm
                onSubmit={handleCreate}
                isLoggedIn={!!user}
            />

            {loading && <p className="comments-loading">Loading comments...</p>}

            {error && <p className="comments-error">{error}</p>}

            {!loading && !error && (
                <div className="comments-list">
                    {comments.length === 0 ? (
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    ) : (
                        comments.map(comment => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                currentUserId={user?.id}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    );
};

export default CommentList;
