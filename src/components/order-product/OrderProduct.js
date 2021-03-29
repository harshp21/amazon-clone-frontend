import React from 'react'
import './order-product.css'
import DateUtilService from "../../service/date-util/DateUtilService";

function OrderProduct({ order }) {

    return (
        <div className="order-product">
            <div className="order-product__container">
                <div className="order-product__container_user">
                    <div className="order-product_title">Customer:</div> {order.user.username}
                </div>
                <div className="order-product__container_order-id">
                    <div className="order-product_title">OrderId:</div> {order._id}
                </div>
                <div className="order-product__container_booked-on">
                    <div className="order-product_title"> Order Timestamp:</div> {DateUtilService.parseDateInGivenFormat(order.orderTimestamp, 'dd/mm/yy')}
                </div>
                <div className="order-product__container_products">
                    <div className="order-product_title"> Products: </div>
                    {order.products.map(product => {
                        return <div key={product._id}>{product.productName}</div>
                    })}
                </div>
                <div className="order-product__container_total">
                    <div className="order-product_title">  Total:</div> {order.totalAmount}
                </div>
                <div className="order-product__container_status">
                    <div className="order-product_title">Status:</div>
                    <div className={order.status === 'Success' ? "order-success" : "order-failure"}>{order.status}</div>
                </div>
                <div className="order-product__container_shipping">
                    <div className="order-product_title">Shipping:</div>
                    {order.shipping.address},<br />{order.shipping.city},{order.shipping.state},<br />{order.shipping.country}
                </div>
            </div>
        </div>
    )
}

export default OrderProduct
