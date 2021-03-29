import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_SUCCESS,
    CART_DETAILS_FETCH_SUCCESS,
    CLEAR_CART,
    REMOVE_FROM_CART_SUCCESS,
    UPDATE_CART_SUCCESS
} from "./cart-actions";

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cart: payload,
            };

        case ADD_TO_CART_FAILURE:
            return {
                ...state,
            }

        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                cart: payload
            };

        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                cart: payload
            }

        case CART_DETAILS_FETCH_SUCCESS:
            return {
                ...state,
                cart: payload
            }

        case CLEAR_CART:
            return {
                ...state,
                cart: {
                    cartProducts: []
                }
            }
        default:
            return state;
    }
}

export { cartReducer };