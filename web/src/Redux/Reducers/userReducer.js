import { GET_USER_BY_ID, ADD_USER, DELETE_USER, LOG_OUT_USER, CHECK_USER_BY_EMAIL } from "../Actions/userActions";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        user:{},
      };

    case LOG_OUT_USER:
      return {
        ...state,
        user: {},
      };

    case CHECK_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;


