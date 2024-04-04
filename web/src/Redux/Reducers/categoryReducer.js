import { GET_CATEGORIES } from '../Actions/categoryActions'

const initialState = {
  categoriesList: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categoriesList: action.payload,
    };
    default:
      return state;
  }
};

export default categoryReducer;
