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
