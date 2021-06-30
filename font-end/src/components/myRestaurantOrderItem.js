import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Row,
    Col, Container
} from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

import { formatDate } from '../common/formatDate';
import { formatCurrency } from '../common/formatCurrency';
import OrderDetailDishItem from '../components/orderDetailDishItem';
import OrderDetailComboItem from '../components/orderDetailComboItem';
import OrderDetailServiceItem from '../components/orderDetailServiceItem';

export default function MyRestaurantOrderItem(props) {
    const order = props.order;
    let orderStatus = order.order_status;

    const [modal, setModal] = useState(false);
    const [orderDetailInfo, setOrderDetailInfo] = useState('');
    const [listOrderDetails, setListOrderDetails] = useState([]);

    if (orderStatus === 'pending') {
        orderStatus = 'Đang chờ duyệt';
    } else if (orderStatus === 'preparing') {
        orderStatus = 'Đã đặt';
    } if (orderStatus === 'accomplished') {
        orderStatus = 'Đã hoàn thành';
    }

    const toggle = () => {
        setModal(!modal);
        if (modal === false) {
            axios.get(`/orders/orderDetail/infor?orderId=${order.order_id}`)
                .then(res => {
                    setOrderDetailInfo(res.data[0]);
                    setListOrderDetails(res.data);
                })
        }
    }

    return (
        <tr>
            <td>{order.order_code}</td>
            <td>{formatCurrency(order.amount) + ' VNĐ'}</td>
            <td>{formatDate(order.order_date)}</td>
            <td>{orderStatus}</td>
            <td>
                <Button onClick={toggle} color="primary">
                    <FaEye className="icon-see-more" />Chi tiết
                </Button>
                <Modal isOpen={modal} toggle={toggle} className={`modal-order`}>
                    <ModalHeader toggle={toggle}>Chi tiết đơn hàng</ModalHeader>
                    <ModalBody>
                        {
                            orderDetailInfo && <Container>
                                <Row>
                                    <Col lg="6" md="6" sm="12" className="info-order">
                                        <h2>Thông tin đơn hàng</h2>
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
                                        <hr />
                                        <div className="info-order-amount">
                                            <h5>Tổng tiền: {formatCurrency(orderDetailInfo.total_amount)} VNĐ</h5>
                                            <h5 >Tiền đặt cọc (10%): {formatCurrency(orderDetailInfo.total_amount * 10 / 100)} VNĐ</h5>
                                            <div className="info-order-btn">
                                                <Button color="success">Nhận đơn</Button>
                                                <Button color="danger">Hủy đơn</Button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="6" md="6" sm="12">
                                        <Row>
                                            <Col lg="12" md="12" sm="12"><OrderDetailDishItem listOrderDetails={listOrderDetails} /></Col>
                                            <Col lg="12" md="12" sm="12"><OrderDetailComboItem listOrderDetails={listOrderDetails} /></Col>
                                            <Col lg="12" md="12" sm="12"><OrderDetailServiceItem listOrderDetails={listOrderDetails} /></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Trở lại</Button>
                    </ModalFooter>
                </Modal>
            </td>
        </tr>
    )
}
