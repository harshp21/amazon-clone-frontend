import React, { useEffect, useState, useContext } from 'react'
import axiosInstance from '../../axios';
import { CartContext } from '../../context/cart-context/cart-context';
import './cart-product.css';

function CartProduct({ cartProduct }) {

    const axios = axiosInstance();
    const initialProductState = { productName: '', pricing: {}, productDescription: '', quantityAvailable: 1 };
    const [product, setProduct] = useState(initialProductState);
    const [quantity, setQuantity] = useState(1);
    const [isGift, setIsGift] = useState(false);

    const cartContext = useContext(CartContext);

    useEffect(() => {
        setQuantity(cartProduct.quantity);
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        const result = await axios.get(`/products/${cartProduct.productId}`);
        setProduct(result.data.product);
    }

    const onQuantityChangeHandler = (e) => {
        const quantity = e.target.value;
        cartContext.updateCart(product, quantity, isGift);
        setQuantity(quantity)
    }

    const onGiftChangeHandler = (e) => {
        const isGift = e.target.checked;
        cartContext.updateCart(product, quantity, isGift);
        setIsGift(isGift);
    }
    return (
        <div className='cart-product'>
            <div className="cart-product__image">
                <img src='https://picsum.photos/200/300' alt='' />
            </div>
            <div className="cart-product__details">
                <div className="cart-product__details_title">{product.productName}</div>
                <div className="cart-product__details_description">{product.productDescription}</div>
                <div className="cart-product__details_availablility">
                    {product.quantityAvailable > 0 ?
                        <span className="in-stock">In Stock</span> :
                        <span className="out-stock">Out of Stock</span>}
                </div>
                <div className="cart-product__details_gift">
                    <input type="checkbox"
                        defaultChecked={cartProduct.isGift}
                        onChange={onGiftChangeHandler} />This order contains a gift
                </div>
                <div className="cart-product__details_action">
                    <div className="action_quantity">
                        Quantity : <input type="number"
                            min={1}
                            max={product.quantityAvailable}
                            value={quantity}
                            onChange={onQuantityChangeHandler} />
                    </div>
                    <span className="seperator"> | </span>
                    <div className="action_remove">
                        <div className="remove-btn" onClick={() => cartContext.removeFromCart(product, quantity)}>
                            Delete
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-product__total">{product.pricing.currency} {product.pricing.productPrice}</div>
        </div>
    )
}

export default CartProduct
