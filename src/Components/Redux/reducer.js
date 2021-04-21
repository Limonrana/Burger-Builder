import * as actionType from './actionTypes';

const ingredientPrice = {
    salad: 20,
    cheese: 35,
    meat: 65,
};

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 },
    ],
    token: null,
    userId: null,
    orders: [],
    isLoading: true,
    isError: false,
    toatlPrice: 80,
    isPurchasable: false,
};

const reducer = (state = INITIAL_STATE, action) => {
    const newIngredients = [...state.ingredients];
    switch (action.type) {
        case actionType.ADD_INGREDIENT: {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of newIngredients) {
                if (item.type === action.payload) {
                    item.amount += 1;
                }
            }
            return {
                ...state,
                ingredients: newIngredients,
                toatlPrice: state.toatlPrice + ingredientPrice[action.payload],
            };
        }
        case actionType.REMOVE_INGREDIENT: {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of newIngredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount -= 1;
                }
            }
            return {
                ...state,
                ingredients: newIngredients,
                toatlPrice: state.toatlPrice - ingredientPrice[action.payload],
            };
        }
        case actionType.UPDATE_PURCHASABLE: {
            const getSum = state.ingredients.reduce((sum, item) => sum + item.amount, 0);
            return {
                ...state,
                isPurchasable: getSum > 0,
            };
        }
        case actionType.RESET_STATE: {
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 },
                ],
                toatlPrice: 80,
                isPurchasable: false,
            };
        }
        case actionType.LOAD_ORDERS: {
            const order = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const key in action.payload) {
                if (Object.hasOwnProperty.call(action.payload, key)) {
                    const element = action.payload[key];
                    order.push({
                        ...element,
                        id: key,
                    });
                }
            }
            return {
                ...state,
                orders: order,
                isLoading: false,
            };
        }
        case actionType.ORDER_LOAD_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        case actionType.AUTH_SUCCESS: {
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        }
        default:
            return state;
    }
};

export default reducer;
