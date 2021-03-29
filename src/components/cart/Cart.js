import React, { useContext } from 'react'
import { CartContext } from '../../context/cart-context/cart-context'
import CartProduct from '../cart-product/CartProduct';
import CartSummary from '../cart-summary/CartSummary'
import './cart.css'

function Cart() {

    const cartContext = useContext(CartContext);
    return (
        <div className="cart">
            <div className="cart__details">
                <div className="cart__details_title">
                    <h2 className="title">Your Cart Products</h2>
                </div>
                <div className="cart__details_products">
                    {cartContext.cartState.cart.cartProducts.length > 0 ?
                        cartContext.cartState.cart.cartProducts.map((cartProduct, index) => {
                            return <CartProduct key={cartProduct._id + index} cartProduct={cartProduct} />
                        }) : <span className="cart__details_notify">Your Amazon Basket is empty</span>}
                </div>
            </div>
            <div className="cart__summary">
                <CartSummary />
            </div>
        </div>
    )
}

export default Cart
