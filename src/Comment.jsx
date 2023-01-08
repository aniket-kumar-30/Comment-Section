import { useState } from "react"
import { updateComment } from "./api/api"
import CommentForm from "./CommentForm"

function Comment({ comment, replies, currentUserId, deleteComment, addComment, parentId = null, activeComment, setActiveComment, updateComment, backendComments }) {
    const fiveMinute = 300000
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinute
    const canReply = Boolean(currentUserId)
    const canEdit = comment.userId === currentUserId && !timePassed
    const canDelete = comment.userId === currentUserId && !timePassed
    const createdAt = new Date(comment.createdAt).toLocaleDateString()
    const replyId = parentId ? parentId : comment.id
    const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying"
    const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing"
    const childReplies = (id) => {
        return backendComments.filter(backendComment => backendComment.parentId === id)
    }
    const [expand, setExpand] = useState(false)
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing &&
                    <div className="comment-text">{comment.body}</div>
                }
                {isEditing &&
                    <CommentForm submitLabel="Update" hasCancelButton initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                }
                <div className="comment-actions">
                    {canReply &&
                        <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>Reply</div>
                    }
                    {canEdit &&
                        <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: "editing" })}>Edit</div>
                    }
                    {canDelete &&
                        <div className="comment-action" onClick={() => deleteComment(comment.id)}>Delete</div>
                    }
                    <div className="comment-action" onClick={() => setExpand(prev => !prev)}>{expand ? 'Hide Replies' : 'Show Replies'}</div>
                </div>
                {isReplying &&
                    <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
                }
                <div style={{ display: expand ? "block" : "none" }}>
                    {replies.length > 0 &&
                        <div className="replies">
                            {replies.map((reply) => (
                                <Comment
                                    key={reply.id}
                                    comment={reply}
                                    replies={childReplies(reply.id)}
                                    currentUserId={currentUserId}
                                    deleteComment={deleteComment}
                                    addComment={addComment}
                                    parentId={reply.id}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    updateComment={updateComment}
                                    backendComments={backendComments}
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment