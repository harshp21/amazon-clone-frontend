import React, { useContext } from 'react'
import { CartContext } from '../../context/cart-context/cart-context';
import './cart-summary.css'
import { Link } from 'react-router-dom';

function CartSummary() {

    const cartContext = useContext(CartContext);
    return (
        <div className="cart-summary">
            <div className="cart-summary__title">
                Cart Summary
            </div>
            <div className="cart-summary__subtotal">Subtotal ({cartContext.cartState.cart.cartProducts.length} items):   {cartContext.cartState.cart.totalCartAmount}</div>
            <div className="cart-summary__gift">
                <input type="checkbox" />This order contains a gift
            </div>
            <div className="cart-summary__checkout">
                <Link to="/payment">
                    Proceed to checkout
                </Link>

            </div>
        </div>
    )
}

export default CartSummary
