import React, { useContext } from 'react';
import './product.css';
import { CartContext } from "../../context/cart-context/cart-context";

function Product({ product }) {

    const cartContext = useContext(CartContext);

    const onAddToCart = () => {
        cartContext.addToCart(product);
    }

    const onRemoveFromCart = () => {
        cartContext.removeFromCart(product);
    }

    const isProductAddedToCart = cartContext.cartState.cart.cartProducts.some((cartProduct) => cartProduct.productId === product._id);
    return (
        <div className="product__card">
            <div className="product__image">
                <img src='https://picsum.photos/200/300' alt="" />
            </div>
            <div className="product__card_title">{product.productTitle}</div>
            <div className="product__card_description">Modo eros usu ei, his et modus ocurreret, nam id omnes congue postea. Vis affert lucilius sententiae ne, ut odio magna repudiare has, impedit vocibus per ei. Epicurei apeirian appellantur has et. Mel nostro fastidii adversarium ut.</div>
            <div className="product__card_price">
                <div className="product-currency">
                    {product.pricing.currency}
                </div>
                <div className="product-amount">
                    {product.pricing.productPrice}
                </div>
                {(product.quantityAvailable > 0) ?
                    <div className="product-in-stock">(In Stock)</div> :
                    <div className="product-out-stock">(Out of Stock)</div>}

            </div>
            {isProductAddedToCart ?
                <div className="product__remove-from-cart" onClick={onRemoveFromCart}>
                    Remove
                </div> :
                <div className="product__add-to-cart" onClick={onAddToCart}>
                    Add To Cart
             </div>
            }


        </div>
    )
}

export default Product
