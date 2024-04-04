export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const CHECK_USER_BY_EMAIL = 'CHECK_USER_BY_EMAIL ';


export const getUserById = (userId) => ({
    type: GET_USER_BY_ID,
    payload: userId,
});

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
});

export const deleteUser = () => ({
    type: DELETE_USER,
    // payload: userId,
});

export const logOutUser = () => ({
    type: LOG_OUT_USER,
});

export const checkUserByEmail = (userId) => ({
    type: CHECK_USER_BY_EMAIL,
    payload: userId,
});


