import { createStore, combineReducers } from 'redux';

import sharingReducer from './Reducers/sharingReducer';
import categoryReducer from './Reducers/categoryReducer';
import userReducer from './Reducers/userReducer';
import commentReducer from './Reducers/commentReducer';

const rootReducer = combineReducers({
    sharings: sharingReducer,
    categories: categoryReducer,
    users: userReducer,
    comments: commentReducer,
});

const store = createStore(rootReducer);

export default store;
 