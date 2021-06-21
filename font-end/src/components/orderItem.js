import React from 'react';
import { CardImg, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function OrderItem() {
    return (
        <Col className="order-col" lg="6" md="12" sm="12">
            <div className="order-item item">
                <CardImg className="order-img" src="/images/c4312934-92df-4c73-87df-d6e005e75182" width="100px" alt="order" />
                <div className="order-content">
                    <div className="order-code">Mã số đơn hàng: #1</div>
                    <div className="order-restaurant-name">Tên nhà hàng: Nha Hang 1</div>
                    <div className="order-type">Tiec tai trung tam</div>
                    <div className="order-order-date">Ngày đặt: 20-06-2021</div>
                    <div className="order-date">Ngày diễn ra: 20-06-2021</div>
                    <Link to={``}>Xem chi tiết</Link>
                </div>
            </div>
        </Col>
    )
}
