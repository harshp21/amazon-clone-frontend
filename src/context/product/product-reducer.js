import {
    PRODUCTS_FETCH_FAILURE,
    PRODUCTS_FETCH_SUCCESS
} from "./product-actions";

const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                categoryWiseProducts: payload
            }
        case PRODUCTS_FETCH_FAILURE:
            return {
                ...state,
                categoryWiseProducts: []
            }
        default:
            return {
                ...state
            }
    }
}

export default productReducer;