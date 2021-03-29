import React, { useReducer } from 'react'
import { ProductContext } from './product-context'
import axiosInstance from '../../axios'
import {
    PRODUCTS_FETCH_FAILURE,
    PRODUCTS_FETCH_SUCCESS
} from './product-actions';
import productReducer from './product-reducer';

function ProductState(props) {

    const initialState = {
        categoryWiseProducts: [],
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    const fetchCategoryWiseProducts = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/products/category-wise-products');
            dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: result.data.categoryWiseProducts })
        } catch (err) {
            dispatch({ type: PRODUCTS_FETCH_FAILURE })
        }
    }
    return (
        <ProductContext.Provider value={{ productState: state, fetchCategoryWiseProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState
