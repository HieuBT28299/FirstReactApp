import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

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

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
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