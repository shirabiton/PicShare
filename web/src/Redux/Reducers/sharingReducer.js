import { GET_SHARINGS, GET_SHARING_BY_ID, ADD_SHARING, DELETE_SHARING } from "../Actions/sharingActions";


const initialState = {
  sharing: {},
  sharingsList: [], // was null
};

const sharingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHARINGS:
      return {
        ...state,
        sharingsList: action.payload,
      };

      case GET_SHARING_BY_ID:
        return {
          ...state,
          sharing: action.payload,
        };

    case ADD_SHARING:
      return {
        ...state,
        sharingsList:[...state.sharingsList,action.payload] ,
      };

    case DELETE_SHARING:
      return {
        ...state,
        id: action.payload,
      };


    default:
      return state;
  }
};

export default sharingReducer;


