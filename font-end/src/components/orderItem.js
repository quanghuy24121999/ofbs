import React from 'react';
import { CardImg, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function OrderItem(props) {
    const order = props.order;
    const userId = props.userId;

    return (
        <Col className="order-col" lg="6" md="12" sm="12">
            <div className="order-item item">
                <CardImg className="order-img" src={`/images/${order.image_restaurant_id}`} width="200px" height="300px" alt="order" />
                <div className="order-content">
                    <div className="order-code">Mã số đơn hàng: {order.order_id} </div>
                    <div className="order-restaurant-name">Tên nhà hàng: {order.restaurant_name}</div>
                    <div className="order-type">{order.restaurant_type}</div>
                    <div className="order-order-date">Ngày đặt: {order.order_date}</div>
                    <div className="order-date">Ngày diễn ra: {order.time}</div>
                    <Link to={`/users/profile/${userId}/orderDetail/${order.order_id}`}>Xem chi tiết</Link>
                </div>
            </div>
        </Col>
    )
}