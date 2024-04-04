export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENT_BY_ID = 'GET_COMMENT_BY_ID';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments,
});

export const getCommentById = (commentId) => ({
    type: GET_COMMENT_BY_ID,
    payload: commentId,
});

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId,
});

