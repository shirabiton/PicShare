export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories,
});
