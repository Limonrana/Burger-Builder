import axios from 'axios';
import * as actionType from './actionTypes';

export const addIngredient = (ingredientType) => ({
    type: actionType.ADD_INGREDIENT,
    payload: ingredientType,
});

export const removeIngredient = (ingredientType) => ({
    type: actionType.REMOVE_INGREDIENT,
    payload: ingredientType,
});

export const updatePurchasable = () => ({
    type: actionType.UPDATE_PURCHASABLE,
});

export const resetState = () => ({
    type: actionType.RESET_STATE,
});

export const loadOrders = (orders) => ({
    type: actionType.LOAD_ORDERS,
    payload: orders,
});

export const orderLoadFailed = (error) => ({
    type: actionType.ORDER_LOAD_FAILED,
    payload: error,
});

// eslint-disable-next-line no-unused-vars
export const fatchOrder = (token, userId) => (dispatch) => {
    const queryString = `&orderBy="userId"&equalTo="${userId}"`;
    axios
        .get(
            `https://burger-builder-7a646-default-rtdb.firebaseio.com/orders.json?auth=${token}${queryString}`
        )
        .then((res) => dispatch(loadOrders(res.data)))
        .catch((error) => dispatch(orderLoadFailed(error)));
};
