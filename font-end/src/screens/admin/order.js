import React, { useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars, FaSearch } from 'react-icons/fa';
import {
    Container, Input, Row, Col,
    Button, CardImg
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import OrderDetailDishItem from '../../components/orderDetailDishItem';
import OrderDetailComboItem from '../../components/orderDetailComboItem';
import OrderDetailServiceItem from '../../components/orderDetailServiceItem';
import { formatDate } from '../../common/formatDate';
import { formatCurrency } from '../../common/formatCurrency';

function Order() {
    const [toggled, setToggled] = useState(false);
    const [orderCode, setOrderCode] = useState('');
    const [restaurantInfo, setRestaurantInfo] = useState('');
    const [orderDetailInfo, setOrderDetailInfo] = useState('');
    const [listOrderDetails, setListOrderDetails] = useState([]);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const onChangeOrderCode = (e) => {
        setOrderCode(e.target.value)
    };

    const search = () => {
        axios.get(`/orders/searchOrder?orderCode=${orderCode}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setRestaurantInfo(res.data[0]);
                setOrderDetailInfo(res.data[0]);
                setListOrderDetails(res.data);
            })
    }

    let orderStatus = '';
    if (orderDetailInfo.order_status === 'pending') {
        orderStatus = 'Chờ duyệt';
    }
    if (orderDetailInfo.order_status === 'preparing') {
        orderStatus = 'Chưa diễn ra';
    }
    if (orderDetailInfo.order_status === 'accomplished') {
        orderStatus = 'Đã diễn ra';
    }
    if (orderDetailInfo.order_status === 'cancelled') {
        orderStatus = 'Đã hủy';
    }

    const Logout = () => {
        localStorage.removeItem('currentAdmin');
    }

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="order"
            />

            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <Link className="btn btn-primary" to='/login' onClick={Logout}>Đăng xuất</Link>
                </div>
                <Container>
                    <Row className="search-order">
                        <Col lg="4" md="12" sm="12"><b>Mã đơn hàng:</b></Col>
                        <Col lg="6" md="12" sm="12">
                            <Input
                                id="order-code"
                                type="text"
                                placeholder="Nhập mã đơn hàng"
                                value={orderCode}
                                onChange={onChangeOrderCode}
                            />
                        </Col>
                        <Col lg="2" md="12" sm="12">
                            <Button className="btn-search-order-code" color="success" onClick={() => search()}>
                                <FaSearch />
                            </Button>
                        </Col>
                    </Row>

                    {
                        listOrderDetails.length > 0 && (<div>
                            <Row className="od-content-header">
                                <Col lg="6" sm="12" className="order-detail-restaurant">
                                    <CardImg
                                        className="od-restaurant-img"
                                        src={`/images/${restaurantInfo.image_restaurant_id}`}
                                        alt="Nhà hàng"
                                        width="100px"
                                        height="200px"
                                    />
                                </Col>

                                <Col lg="6" sm="12" className="od-info">
                                    <div className="od-restaurant-content">
                                        <div className="od-restaurant-name"><b>Tên nhà hàng: </b>{restaurantInfo.restaurant_name}</div>
                                        <div className="od-restaurant-address"><b>Địa chỉ: </b>{restaurantInfo.province}</div>
                                        <div className="od-restaurant-type"><b>Loại hình: </b>{restaurantInfo.restaurant_type}</div>
                                    </div>
                                    <hr />
                                    <div className="od-info-code"><b>Mã số đơn hàng: </b>{orderDetailInfo.order_code}</div>
                                    <div className="od-info-type"><b>Loại bàn: </b>{orderDetailInfo.table_type}</div>
                                    <div className="od-info-guest-number"><b>Số lượng khách: </b>{orderDetailInfo.number_of_guests}</div>
                                    <div className="od-info-order-date"><b>Thời gian đặt: </b>{formatDate(orderDetailInfo.order_date)}</div>
                                    <div className="od-info-organize-date">
                                        <b>Thời gian tổ chức: </b>{orderDetailInfo.time + ' ' + formatDate(orderDetailInfo.organize_date)}
                                    </div>
                                    <div className="od-info-note"><b>Ghi chú: </b>{orderDetailInfo.note}</div>
                                    <div className="od-info-status"><b>Trạng thái: </b>{orderStatus}</div>
                                </Col>
                            </Row>

                            <hr></hr>

                            <Row className="od-content-detail">
                                <Col><OrderDetailDishItem listOrderDetails={listOrderDetails} /></Col>
                                <Row>
                                    <Col><OrderDetailComboItem listOrderDetails={listOrderDetails} /></Col>
                                    <Col><OrderDetailServiceItem listOrderDetails={listOrderDetails} /></Col>
                                </Row>
                            </Row>
                            <div className="order-detail-footer">
                                <div className="order-detail-amount">
                                    <h4>Tổng tiền: {formatCurrency(orderDetailInfo.total_amount)} VNĐ</h4>
                                    <h4 >Tiền đặt cọc (10%): {formatCurrency(orderDetailInfo.total_amount * 10 / 100)} VNĐ</h4>
                                </div>
                            </div>
                        </div>)
                    }
                </Container>
            </div>

        </div>
    );
}

export default Order;
