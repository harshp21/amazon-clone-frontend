import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge, IconButton } from "@material-ui/core";
import { CartContext } from "../../context/cart-context/cart-context";
import { UserContext } from "../../context/user-context/user-context";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Header() {

    const cartContext = useContext(CartContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        userContext.isUserLoggedIn();
        cartContext.fetchCartProducts()
    }, [])

    const onSignOutHandler = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        userContext.signOutUser()
                        cartContext.clearCart();
                    },
                },
                {
                    label: 'No',
                }
            ]
        })
    }
    return (
        <div className="header">
            <div className="header__logo">
                <Link to="/home"><img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"></img></Link>
            </div>
            <div className="header__search">
                <input type="text" className="header__search_input" />
                <IconButton className="header__search_container">
                    <SearchIcon className="header__search_btn" />
                </IconButton>
            </div>
            <div className="header__options">
                <span className="header__options_line-one">Hello {userContext.userState.user.username ? userContext.userState.user.username : 'Guest'}</span>
                {userContext.userState.isUserLoggedIn ?
                    <span className="header__options_line-two" onClick={onSignOutHandler}>
                        Sign-out
                    </span> :
                    <span className="header__options_line-two">
                        <Link to="/sign-in">Sign-in</Link>
                    </span>}


            </div>
            <div className="header__options">

                <span className="header__options_line-one">Returns</span>
                <span className="header__options_line-two">
                    <Link to="/orders">& orders </Link>
                </span>

            </div>
            <div className="header__options cart-options">
                <Link to="/cart">
                    <IconButton>
                        <Badge badgeContent={cartContext.cartState.cart.cartProducts.length} color="secondary">
                            <ShoppingCartIcon className="header__options_cart" />
                        </Badge>
                    </IconButton>
                </Link>

            </div>
        </div>
    )
}

export default Header
