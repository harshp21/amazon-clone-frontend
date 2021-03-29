import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/cart-context/cart-context';
import { UserContext } from '../../context/user-context/user-context';
import CartProduct from '../cart-product/CartProduct';
import RazorPay from '../razor-pay/RazorPay';
import './payment.css'

function Payment() {

    const cartContext = useContext(CartContext);
    const [shippingDetails, setShippingDetails] = useState({ country: '', mobile: '', pinCode: '', apartment: '', area: '', landmark: '', city: '', state: '' });
    const userContext = useContext(UserContext);
    const [areShippingDetailsValid, setAreShippingDetailsValid] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const areProductAvailable = cartContext.cartState.cart.cartProducts.length > 0;
    const history = useHistory();

    const paymentData = {
        products: cartContext.cartState.cart.cartProducts,
        totalAmount: cartContext.cartState.cart.totalCartAmount,
        name: userContext.userState.user.username,
        email: userContext.userState.user.emailId,
        shippingDetails
    }

    useEffect(() => {
        setAreShippingDetailsValid(isShippingDetailsValid());
    }, [shippingDetails])


    const onPaymentCallback = () => {
        if (!isShippingDetailsValid()) {
            toast.error(errMsg);
        } else {
            cartContext.clearCart();
            toast.success('Product ordered Successfully');
            history.push('/orders');
        }
    }

    const areCartProductAvailable = cartContext.cartState.cart.cartProducts.length !== 0;

    const isShippingDetailsValid = () => {
        let areValidShipping = true;
        let errorMsg = '';
        if (shippingDetails.country === '') {
            areValidShipping = false;
            errorMsg = 'Country name cannot be blank'
        } else if (shippingDetails.mobile === '') {
            areValidShipping = false;
            errorMsg = 'Mobile no should be valid 10 digit no'
        } else if (shippingDetails.pinCode === '') {
            areValidShipping = false;
            errorMsg = 'Enter a valid pin code'
        } else if (shippingDetails.apartment === '') {
            areValidShipping = false;
            errorMsg = 'Enter valid apartment details'
        } else if (shippingDetails.area === '') {
            areValidShipping = false;
            errorMsg = 'Enter valid area details'
        } else if (shippingDetails.city === '') {
            areValidShipping = false;
            errorMsg = 'Enter valid city details'
        } else if (shippingDetails.state === '') {
            areValidShipping = false;
            errorMsg = 'Enter valid state details'
        }
        if (errorMsg !== '') setErrMsg(errorMsg);
        return areValidShipping;
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link className="link" to='/cart'>{cartContext.cartState.cart.cartProducts.length} items</Link>)
                </h1>
                <div className="payment__container_section">
                    <div className="payment_title">
                        <h3>Address</h3>
                    </div>
                    <div className="payment_address">

                        <div className="form-label field-mandatory">Country/Region</div>
                        <input type="text" defaultValue={shippingDetails.country} onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })} className="input-field" />

                        <div className="form-label field-mandatory">Mobile number</div>
                        <input type="text" defaultValue={shippingDetails.mobile} onChange={(e) => setShippingDetails({ ...shippingDetails, mobile: e.target.value })} className="input-field" />

                        <div className="form-label field-mandatory">PIN code</div>
                        <input type="text" defaultValue={shippingDetails.pinCode} onChange={(e) => setShippingDetails({ ...shippingDetails, pinCode: e.target.value })} className="input-field" />

                        <div className="form-label field-mandatory">Flat, House no., Building, Company, Apartment</div>
                        <input type="text" defaultValue={shippingDetails.apartment} onChange={(e) => setShippingDetails({ ...shippingDetails, apartment: e.target.value })} className="input-field" />

                        <div className="form-label field-mandatory">Area, Colony, Street, Sector, Village</div>
                        <input type="text" defaultValue={shippingDetails.area} onChange={(e) => setShippingDetails({ ...shippingDetails, area: e.target.value })} className="input-field" />

                        <div className="form-label">Landmark</div>
                        <input type="text" defaultValue={shippingDetails.landmark} onChange={(e) => setShippingDetails({ ...shippingDetails, landmark: e.target.value })} className="input-field" />

                        <div className="form-label field-mandatory">Town/City</div>
                        <input type="text" defaultValue={shippingDetails.city} onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })} className="input-field" />

                        <div className="form-label field-mandatory">State / Province / Region</div>
                        <input type="text" defaultValue={shippingDetails.state} onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })} className="input-field" />
                    </div>
                </div>
                <div className="payment__container_section">
                    <div className="payment_title">
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {areCartProductAvailable ?
                            cartContext.cartState.cart.cartProducts.map((cartProduct, index) => {
                                return <CartProduct key={cartProduct._id + index} cartProduct={cartProduct} />
                            }) : <div className="payment-notify">No cart Products Available </div>}
                    </div>
                </div>
                <div className="payment__container_section checkout-container">
                    <div className="payment_title">
                        <h3>Total</h3>
                    </div>
                    <div className="payment_amount">
                        {cartContext.cartState.cart.totalCartAmount}
                    </div>
                </div>
                <div className="payment__container_section checkout-container">
                    <div className="payment_title">
                        <h3>Payment</h3>
                    </div>
                    <div className="payment_checkout">
                        <div className="checkout-btn">
                            <RazorPay paymentData={paymentData}
                                isDisabled={!areShippingDetailsValid || !areProductAvailable}
                                onPaymentCallback={onPaymentCallback} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
