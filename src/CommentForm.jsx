import { useState } from 'react'
function CommentForm({ handleSubmit,
    submitLabel,
    hasCancelButton = false,
    initialText = "",
    handleCancel
}) {
    const [text, setText] = useState(initialText)
    const isTextAreaDisabled = text.length === 0
    const commentSubmit = (e) => {
        e.preventDefault()
        handleSubmit(text)
        setText('')
    }
    return (
        <form onSubmit={commentSubmit}>
            <textarea className='comment-form-textarea' value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit" className='comment-form-button' disabled={isTextAreaDisabled}>{submitLabel}</button>
            {hasCancelButton &&
                <button type='submit' className='comment-form-button comment-form-cancel-button' onClick={handleCancel}>Cancel</button>
            }
        </form>
    )
}

export default CommentForm