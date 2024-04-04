export const GET_SHARINGS = 'GET_SHARINGS';
export const GET_SHARING_BY_ID = 'GET_SHARING_BY_ID';
export const ADD_SHARING = 'ADD_SHARING';
export const DELETE_SHARING = 'DELETE_SHARING';

export const getSharings = (sharings) => ({
    type: GET_SHARINGS,
    payload: sharings,
});

export const getSharingById = (sharingId) => ({
    type: GET_SHARING_BY_ID,
    payload: sharingId,
});

export const addSharing = (sharing) => ({
    type: ADD_SHARING,
    payload: sharing,
});

export const deleteSharing = (id) => ({
    type: DELETE_SHARING,
    payload: id,
});

