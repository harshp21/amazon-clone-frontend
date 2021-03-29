import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import ActivateAccount from '../activate-account/ActivateAccount'
import Cart from '../cart/Cart'
import Header from '../header/Header'
import Home from '../home/Home'
import Order from '../orders/Order'
import Payment from '../payment/payment'
import ProtectedRoute from '../protected-route/ProtectedRoute'

function HeaderRoutes() {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/activate-account/:activationCode" component={ActivateAccount} />
                <ProtectedRoute exact path="/cart" component={Cart} />
                <ProtectedRoute exact path='/payment' component={Payment} />
                <ProtectedRoute exact path='/orders' component={Order} />
                <Route exact path="/">
                    <Redirect to='/home' />
                </Route>
                <Route path="*">
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </>
    )
}

export default HeaderRoutes
