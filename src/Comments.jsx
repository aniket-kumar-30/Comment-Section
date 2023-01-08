import { useState, useEffect } from 'react'
import { getComment as getCommentApi, createComment as createCommentApi, deleteComment as deleteCommentApi, updateComment as updateCommentApi } from './api/api'
import Comment from './Comment'
import CommentForm from './CommentForm'
function Comments({ currentUserId }) {
    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments.filter((comment) => comment.parentId === null)
    const getReplies = (commentId) => {
        return backendComments.filter((backendComment) => backendComment.parentId === commentId)
            .sort((a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    useEffect(() => {
        getCommentApi().then((data) => setBackendComments(data))
    }, [])
    const addComment = (text, parentid) => {
        console.log(text, parentid)
        createCommentApi(text, parentid).then((data) => setBackendComments([data, ...backendComments]))
        setActiveComment(null)
    }
    const deleteComment = (commentId) => {
        deleteCommentApi(commentId).then(() => {
            if (window.confirm('Are you sure!')) {
                const updateBackendComments = backendComments.filter(backendComment => backendComment.id !== commentId)
                setBackendComments(updateBackendComments)
            }
        })
    }
    const updateComment = (text, parentId) => {
        updateCommentApi(text).then((data) => {
            const updatedComments = backendComments.map(backendComment => backendComment.id === parentId ? { ...backendComment, body: text } : backendComment)
            setBackendComments(updatedComments)
        })
        setActiveComment(null)
    }
    return (
        <div className='comments'>
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write Comment</div>
            <CommentForm handleSubmit={addComment} submitLabel="Write" />
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        addComment={addComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        updateComment={updateComment}
                        backendComments={backendComments}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments