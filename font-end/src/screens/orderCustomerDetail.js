import React, { Component } from 'react';
import {
    Container, Nav, NavItem, CardImg, Row, Col,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import OrderDetailDishItem from '../components/orderDetailDishItem';
import OrderDetailComboItem from '../components/orderDetailComboItem';
import OrderDetailServiceItem from '../components/orderDetailServiceItem';
import { formatDate } from '../common/formatDate';
import { formatCurrency } from '../common/formatCurrency';
export default class orderCustomerDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantInfo: '',
            orderDetailInfo: '',
            listOrderDetails: [],
            dishes: [],
            combos: [],
            services: [],
        }
    }

    componentDidMount() {
        const orderId = this.props.match.params.orderId;

        axios.get(`/orders/orderDetail/infor?orderId=${orderId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                this.setState({
                    restaurantInfo: res.data[0],
                    orderDetailInfo: res.data[0],
                    listOrderDetails: res.data
                });
            })
    }

    render() {
        const userId = this.props.match.params.userId;
        const { listOrderDetails, restaurantInfo, orderDetailInfo } = this.state;

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

        let organizeDate = formatDate(orderDetailInfo.organize_date);
        let orderDate = formatDate(orderDetailInfo.order_date);

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem>
                        <Link to={`/users/profile/${userId}`}>Hồ sơ</Link>
                    </NavItem>
                    <NavItem className="active">
                        <Link to={`/users/profile/${userId}/order`}>Đơn của tôi</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/users/profile/${userId}/my-restaurant`}>Nhà hàng của tôi</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={``}>Ví FBS</Link>
                    </NavItem>
                </Nav>

                <Container className="order-detail-content">
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
                                <Link to={`/restaurant-detail/${restaurantInfo.restaurant_id}`}>Đi đến nhà hàng</Link>
                            </div>
                            <hr />
                            <div className="od-info-code"><b>Mã số đơn hàng: </b>{orderDetailInfo.order_code}</div>
                            <div className="od-info-type"><b>Loại bàn: </b>{orderDetailInfo.table_type}</div>
                            <div className="od-info-guest-number"><b>Số lượng khách: </b>{orderDetailInfo.number_of_guests}</div>
                            <div className="od-info-order-date"><b>Thời gian đặt: </b>{orderDate}</div>
                            <div className="od-info-organize-date">
                                <b>Thời gian tổ chức: </b>{orderDetailInfo.time + ' ' + organizeDate}
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
                        <Button color="danger">Hủy đặt</Button>
                    </div>
                </Container>

                <Footer />
            </div>
        )
    }
}
