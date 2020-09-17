import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => {
    //returning an action
    return ({
        type: ActionTypes.ADD_COMMENT,
        payload: {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
    });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => {
    //returning an action
    return ({
        type: ActionTypes.DISHES_LOADING
    });
}

export const dishesFailed = (errMess) => {
    //returning an action
    return ({
        type: ActionTypes.DISHES_FAILED,
        payload: errMess
    });
}

export const addDishes = (dishes) => {
    //returning an action
    return ({
        type: ActionTypes.ADD_DISHES,
        payload: dishes
    });
}

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMess) => {
    //returning an action
    return ({
        type: ActionTypes.COMMENTS_FAILED,
        payload: errMess
    });
}

export const addComments = (comments) => {
    //returning an action
    return ({
        type: ActionTypes.ADD_COMMENTS,
        payload: comments
    });
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => {
    //returning an action
    return ({
        type: ActionTypes.PROMOS_LOADING
    });
}

export const promosFailed = (errMess) => {
    //returning an action
    return ({
        type: ActionTypes.PROMOS_FAILED,
        payload: errMess
    });
}

export const addPromos = (promos) => {
    //returning an action
    return ({
        type: ActionTypes.ADD_PROMOS,
        payload: promos
    });
}