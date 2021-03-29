import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../../axios';
import OrderProduct from '../order-product/OrderProduct';
import './order.css';

function Order() {

    const axios = axiosInstance();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const result = await axios.get('/orders');
            setOrders(result.data.orders);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className="orders">
            <div className="orders__container">
                <div className="order__container_title">
                    Orders
                </div>
                <div className="order__container_products">
                    {orders.length !== 0 ?
                        orders.map(order => {
                            return <OrderProduct key={order._id} order={order} />
                        }) : <div className="order__container_notify">No order are done yet</div>}
                </div>
            </div>
        </div>
    )
}

export default Order
