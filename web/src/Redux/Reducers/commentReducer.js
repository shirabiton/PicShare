import { GET_COMMENTS, GET_COMMENT_BY_ID, ADD_COMMENT, DELETE_COMMENT } from "../Actions/commentAction";


const initialState = {
  comment: {},
  commentsList: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        commentsList: action.payload,
      }

    case GET_COMMENT_BY_ID:
      return {
        ...state,
        commentId: action.payload,
      };

    case ADD_COMMENT:
      return {
        ...state,
        commentsList: [...state.commentsList, action.payload],
        // comment: action.payload,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        // commentsList: state.commentsList.filter(comment => comment.id !== action.payload),
        commentId: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;


