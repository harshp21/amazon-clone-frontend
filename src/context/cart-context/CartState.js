import React, { useReducer } from 'react';
import { CartContext } from './cart-context';
import { cartReducer } from "./cart-reducer";
import {
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_SUCCESS,
    UPDATE_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    CART_DETAILS_FETCH_SUCCESS,
    CART_DETAILS_FETCH_FAILURE,
    UPDATE_CART_FAILURE,
    CLEAR_CART
} from "./cart-actions";
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';

function CartState(props) {

    const initialState = {
        cart: {
            cartProducts: [],
            totalCartAmount: 0
        }
    }

    const addToCart = async (product) => {
        try {
            const axios = axiosInstance();
            const result = await axios.post('/cart/add', { product });
            toast.success(result.data.message);
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: result.data.cart });
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: ADD_TO_CART_FAILURE });

        }
    }

    const removeFromCart = async (product, quantity = 1) => {
        try {
            const axios = axiosInstance();
            const result = await axios.put('/cart/remove', { product, quantity })
            toast.success(result.data.message);
            dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: result.data.cart });
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: REMOVE_FROM_CART_FAILURE });
        }
    }

    const fetchCartProducts = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/cart');
            const payload = result.data.cart === null ? initialState.cart : result.data.cart;
            dispatch({ type: CART_DETAILS_FETCH_SUCCESS, payload })
        } catch (err) {
            dispatch({ type: CART_DETAILS_FETCH_FAILURE })
        }
    }

    const updateCart = async (product, quantity, isGift) => {
        try {
            const axios = axiosInstance();
            const result = await axios.put('/cart/update', { product, quantity, isGift });
            dispatch({ type: UPDATE_CART_SUCCESS, payload: result.data.cart });
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: UPDATE_CART_FAILURE });
        }
    }

    const clearCart = () => {
        dispatch({ type: CLEAR_CART })
    }

    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ cartState: state, addToCart, removeFromCart, updateCart, fetchCartProducts, clearCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState
