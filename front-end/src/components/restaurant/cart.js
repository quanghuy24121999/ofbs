import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import {
    Button, Modal, Badge, Input, Form,
    ModalHeader, ModalBody, ModalFooter,
    Label, FormGroup, Row, Col, Container
} from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa'
import { api } from '../../config/axios';

import CartDishItem from './cartDishItem';
import CartComboItem from './cartComboItem';
import CartServiceItem from './cartServiceItem';
import { formatDateForInput } from '../../common/formatDate';
import { formatCurrency } from '../../common/formatCurrency';
import { Notify } from '../../common/notify';
import { validateCapacity, validateItemCart } from '../../common/validate';
import OrderDetailDishItem from '../order/orderDetailDishItem';
import OrderDetailComboItem from '../order/orderDetailComboItem';
import OrderDetailServiceItem from '../order/orderDetailServiceItem';


export default function Cart(props) {
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [active, setActive] = useState(0);

    const [modalConfirm, setModalComfirm] = useState(false);
    const [typeTable, setTypeTable] = useState(6);
    const [customerQuantity, setCustomerQuantity] = useState(1);
    const [period, setPeriod] = useState('Trưa');
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');

    const toggle = () => {
        setModal(!modal);
        if (!modal) {
            let customerQuantity = '';
            if (metadata !== undefined) {
                customerQuantity = metadata.customerQuantity;
            } else {
                customerQuantity = 1;
            }
            updateCartMetadata({
                customerQuantity: customerQuantity
            })
        }
    }
    const toggle1 = () => setModal1(!modal1);
    const toggleConfirm = () => setModalComfirm(!modalConfirm);
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const {
        isEmpty,
        items,
        totalUniqueItems,
        cartTotal,
        updateCartMetadata,
        metadata,
        emptyCart
    } = useCart();

    const onchangeTypeTable = (e) => {
        e.preventDefault();
        setTypeTable(e.target.value);
        updateCartMetadata({
            type: parseInt(e.target.value),
            customerQuantity: parseInt(e.target.value)
        })
    }

    const calNumTable = (numCustomer, typeTable) => {
        let numTable = Math.ceil(numCustomer / typeTable);
        if (numTable < 1) {
            return 1;
        } else if (numTable >= 1) {
            return numTable;
        }
    }

    const onChangeCustomerQuantity = (e) => {
        e.preventDefault();
        setCustomerQuantity(e.target.value);
        updateCartMetadata({
            customerQuantity: parseInt(e.target.value)
        })
    }

    const onchangePeriod = (e) => {
        e.preventDefault();
        setPeriod(e.target.value);
        updateCartMetadata({
            period: e.target.value
        })
    }

    const onChangeTime = (e) => {
        e.preventDefault();
        setTime(e.target.value);
        updateCartMetadata({
            time: e.target.value
        })
    }

    const onChangeNote = (e) => {
        e.preventDefault();
        setNote(e.target.value);
        updateCartMetadata({
            note: e.target.value
        })
    }

    const validateCart = () => {
        let count = 0;

        items.forEach(item => {
            if (!validateItemCart(item.quantity)) {
                count = count + 1;
            }
        })

        if (!validateCapacity(customerQuantity)) {
            Notify('Số lượng khách quá lớn', 'error', 'top-right');
            return false;
        } else if (count > 0) {
            Notify('Số lượng quá lớn', 'error', 'top-right');
            return false;
        } else {
            return true;
        }
    }

    const payment = () => {
        api({
            method: 'POST',
            url: `/payment/pay?price=${cartTotal * 0.1 / 23000}&description=${'Thanh toán đơn hàng FBS'}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

            // api.post(`/payment/pay?price=${cartTotal * 0.1 / 23000}&description=${'Thanh toán đơn hàng FBS'}`, {
            //     headers: {
            //         'Authorization': 'Bearer ' + localStorage.getItem('token')
            //     }
            // })
            .then(res => {
                // setLinkPaypal(res.data);
                // if (linkPaypal !== '') {
                window.location.replace(res.data);
                // }
            }).catch(err => {
            });
    }

    const onSubmitCart = () => {
        let currentUser;
        const restaurantId = props.restaurantId;

        let arr = [];

        let object = {
            "quantity": 0,
            "dishId": 0,
            "comboId": 0,
            "serviceId": 0,
            "customerId": 0,
            "restaurantId": 0
        }

        api.get(`/users/findByPhoneNumber/${localStorage.getItem('currentUser')}`)
            .then(res => {
                currentUser = res.data;
                api.post(`/orders/insertOrder`, {
                    "time": period,
                    "organizeDate": time,
                    "customerId": parseInt(currentUser.id),
                    "restaurantId": parseInt(restaurantId),
                    "tableType": parseInt(typeTable),
                    "numberOfGuests": customerQuantity,
                    "note": note
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    const orderCode = res.data.orderCode;
                    items.forEach(item => {
                        if (item.dish_name) {
                            object = {};
                            object.quantity = item.quantity;
                            object.dishId = item.id;
                            object.comboId = 0;
                            object.serviceId = 0;
                            object.customerId = parseInt(currentUser.id);
                            object.restaurantId = parseInt(restaurantId);

                            arr.push(object);
                        }

                        else if (item.combo_name) {
                            object = {};
                            object.quantity = item.quantity;
                            object.dishId = 0;
                            object.comboId = item.id;
                            object.serviceId = 0;
                            object.customerId = parseInt(currentUser.id);
                            object.restaurantId = parseInt(restaurantId);

                            arr.push(object);
                        }

                        else if (item.service_name) {
                            object = {};
                            object.quantity = item.quantity;
                            object.dishId = 0;
                            object.comboId = 0;
                            object.serviceId = item.id;
                            object.customerId = parseInt(currentUser.id);
                            object.restaurantId = parseInt(restaurantId);

                            arr.push(object);
                        }
                    })

                    let json = JSON.stringify(arr);
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }

                    api.get(`/orders/getOrderIdBeforeInsert?customerId=${parseInt(currentUser.id)}&restaurantId=${parseInt(restaurantId)}`, config)
                        .then(res => {
                            localStorage.setItem("orderId", res.data);
                            api.post(`/orders/insertOrderDetail`, json, config)
                                .then(res => {
                                    api({
                                        method: 'PATCH',
                                        headers: {
                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                        },
                                        url: `/orders/setStatus?customerId=${currentUser.id}&restaurantId=${restaurantId}`
                                    }).then(res => {
                                        updateCartMetadata({
                                            customerQuantity: 1,
                                            period: "",
                                            time: "",
                                            type: 0
                                        })

                                        api.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
                                            .then(res => {
                                                const restaurant = res.data;
                                                api.post(`/notifications/insertNotification`,
                                                    {
                                                        "content": `Có đơn hàng mới của ${restaurant.restaurantName}`,
                                                        "customer": null,
                                                        "provider": restaurant.provider,
                                                        "forAdmin": false,
                                                        "type": "order",
                                                        "read": false
                                                    }
                                                ).then(res => {
                                                    if (active === 0) {
                                                        if (parseFloat(currentUser.balance) > parseFloat(cartTotal * 0.1)) {
                                                            emptyCart();
                                                            setModalComfirm(!modalConfirm);
                                                            api.get(`/users/findByRole?roleName=ROLE_ADMIN`)
                                                                .then(res => {
                                                                    const admin = res.data;
                                                                    api.post(`/payment/save`,
                                                                        {
                                                                            "user": currentUser,
                                                                            "fromToUser": admin,
                                                                            "balanceChange": parseFloat(-cartTotal * 0.1),
                                                                            "currentBalance": parseFloat(currentUser.balance) - (parseFloat(cartTotal * 0.1)),
                                                                            "description": "Thanh toán cọc đơn hàng " + orderCode,
                                                                            "paymentType": {
                                                                                "name": "pay"
                                                                            }
                                                                        },
                                                                        {
                                                                            headers: {
                                                                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                            }
                                                                        }
                                                                    ).then(res => {
                                                                        const paymentHistory = res.data;
                                                                        api({
                                                                            method: 'PATCH',
                                                                            headers: {
                                                                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                            },
                                                                            url: `/payment/updateStatus?paymentId=${paymentHistory.id}&status=success`
                                                                        }).then(res => {
                                                                            api({
                                                                                method: 'PATCH',
                                                                                headers: {
                                                                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                                },
                                                                                url: `users/updateBalance?balance=${parseFloat(currentUser.balance) - parseFloat(cartTotal * 0.1)}&userId=${currentUser.id}`
                                                                            })
                                                                                .then(res => {
                                                                                    api({
                                                                                        method: 'PATCH',
                                                                                        headers: {
                                                                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                                        },
                                                                                        url: `/orders/updateStatus?orderId=${localStorage.getItem("orderId")}&status=pending`
                                                                                    }).then(res => {
                                                                                        localStorage.removeItem("orderId");
                                                                                        Notify('Thanh toán đơn hàng thành công', 'success', 'top-right');
                                                                                        toggle();
                                                                                        toggle1();
                                                                                    })
                                                                                })
                                                                        })
                                                                    })

                                                                    api.post(`/payment/save`,
                                                                        {
                                                                            "user": admin,
                                                                            "fromToUser": currentUser,
                                                                            "balanceChange": parseFloat(cartTotal * 0.1),
                                                                            "currentBalance": parseFloat(admin.balance) + (parseFloat(cartTotal * 0.1)),
                                                                            "description": "Khách hàng thanh toán cọc đơn hàng " + orderCode,
                                                                            "paymentType": {
                                                                                "name": "pay"
                                                                            }
                                                                        },
                                                                        {
                                                                            headers: {
                                                                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                            }
                                                                        }
                                                                    ).then(res => {
                                                                        const paymentHistory = res.data;
                                                                        api({
                                                                            method: 'PATCH',
                                                                            headers: {
                                                                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                            },
                                                                            url: `/payment/updateStatus?paymentId=${paymentHistory.id}&status=success`
                                                                        }).then(() => {
                                                                            api({
                                                                                method: 'PATCH',
                                                                                headers: {
                                                                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                                                },
                                                                                url: `users/updateBalance?balance=${parseFloat(admin.balance) + parseFloat(paymentHistory.balanceChange)}&userId=${admin.id}`
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                        } else {
                                                            Notify('Số tiền trong ví của bạn không đủ', 'error', 'top-right');
                                                        }
                                                    } else if (active === 1) {
                                                        emptyCart();
                                                        setModalComfirm(!modalConfirm);
                                                        payment();
                                                        toggle();
                                                        toggle1();
                                                    }
                                                })
                                            })
                                    })
                                })
                        })
                })
            })
    }

    if (isEmpty) {
        return (
            <div>
                <Button onClick={toggle} className="cart-display" color="primary" outline>
                    <FaShoppingCart />
                    <Badge className="cart-total-item">
                        {totalUniqueItems}
                    </Badge>
                </Button>

                <Modal isOpen={modal} toggle={toggle} className="cart-modal">
                    <ModalHeader toggle={toggle}>Giỏ hàng</ModalHeader>
                    <ModalBody>
                        <h3>Giỏ hàng trống !</h3>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Quay lại</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    return (
        <div>
            <Button onClick={toggle} className="cart-display" color="primary" outline>
                <FaShoppingCart />
                <Badge className="cart-total-item">
                    {totalUniqueItems}
                </Badge>
            </Button>

            <div>
                <Modal isOpen={modal} toggle={toggle} className="cart-modal">
                    <ModalHeader toggle={toggle}>Giỏ hàng</ModalHeader>
                    <ModalBody>
                        <Modal isOpen={modal1} toggle={toggle1} className={`info-cart-modal`}>
                            <ModalHeader toggle={toggle1}>Thông báo</ModalHeader>
                            <ModalBody>
                                <Container>
                                    <Row>
                                        <Col lg="6" md="12" sm="12">
                                            <Row>
                                                <Col lg="12" md="12" sm="12"><OrderDetailDishItem listOrderDetails={items} /></Col>
                                                <Col className="mt-4" lg="12" md="12" sm="12"><OrderDetailComboItem listOrderDetails={items} /></Col>
                                                <Col className="mt-4" lg="12" md="12" sm="12"><OrderDetailServiceItem listOrderDetails={items} /></Col>
                                            </Row>
                                        </Col>
                                        <Col lg="6" md="12" sm="12">
                                            <div>
                                                <b>Vui lòng kiểm tra lại đơn hàng trước khi thực hiện thanh toán.<br /><br /></b>
                                                <span className="od-dish-item-total">Tổng tiền đơn hàng: {formatCurrency(cartTotal)} VNĐ</span><br /><br />
                                                Số tiền phải thanh toán là <b>{formatCurrency(cartTotal * 0.1) + ' VNĐ'}</b>.
                                                Bạn phải thanh toán cọc <b>10%</b> tổng tiền của đơn hàng.
                                            </div>
                                            <hr />
                                            <div>
                                                <FormGroup tag="fieldset">
                                                    <h6>Chọn phương thức thanh toán</h6>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input
                                                                type="radio"
                                                                name="radio1"
                                                                checked={active === 0}
                                                                onClick={() => setActive(0)}
                                                            />{' '}
                                                            Thanh toán bằng ví FBS
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input
                                                                type="radio"
                                                                name="radio1"
                                                                checked={active === 1}
                                                                onClick={() => setActive(1)}
                                                            />{' '}
                                                            Thanh toán băng ví Paypal
                                                        </Label>
                                                    </FormGroup>
                                                </FormGroup>
                                            </div>

                                        </Col>
                                    </Row>
                                </Container>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={toggleConfirm}>Thanh toán</Button>{' '}
                                <Modal isOpen={modalConfirm} toggle={toggleConfirm} className="cart-modal">
                                    <ModalHeader toggle={toggleConfirm}>Thông báo</ModalHeader>
                                    <ModalBody>
                                        Bạn có chắc chắn thanh toán đơn hàng này ?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="success" onClick={() => {
                                            onSubmitCart();
                                        }}>Đồng ý</Button>
                                        <Button color="secondary" onClick={toggleConfirm}>Quay lại</Button>
                                    </ModalFooter>
                                </Modal>
                                <Button color="secondary" onClick={toggle1}>Quay lại</Button>
                            </ModalFooter>
                        </Modal>
                        <Form
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (validateCart()) {
                                    toggle1();
                                }
                            }}
                        >
                            <div className="cart-option">
                                <h4>Tùy chọn</h4>
                                <div className="cart-other-option">
                                    <div>
                                        <Label for="type"><b>Loại bàn <span className="require-icon">*</span></b></Label>
                                        <Input
                                            type="select"
                                            name="type"
                                            id="type"
                                            onChange={onchangeTypeTable}
                                            value={metadata.type}
                                            required="required"
                                        >
                                            <option value={6}>Bàn 6</option>
                                            <option value={8}>Bàn 8</option>
                                        </Input>
                                    </div>

                                    <div>
                                        <Label for="period"><b>Buổi <span className="require-icon">*</span></b></Label>
                                        <Input
                                            type="select"
                                            name="period"
                                            id="period"
                                            onChange={onchangePeriod}
                                            value={metadata.period}
                                            required="required"
                                        >
                                            <option value={'Trưa'}>Trưa</option>
                                            <option value={'Tối'}>Tối</option>
                                        </Input>
                                    </div>
                                </div>

                                <div className="cart-other-option">
                                    <div>
                                        <Label for="customer-quantity"><b>Số lượng khách <span className="require-icon">*</span></b></Label>
                                        <Input
                                            type="number"
                                            name="customer-quantity"
                                            id="customer-quantity"
                                            min={1}
                                            onChange={onChangeCustomerQuantity}
                                            value={customerQuantity}
                                            required="required"
                                        />
                                    </div>

                                    <div>
                                        <Label for="choose-date"><b>Chọn ngày <span className="require-icon">*</span></b></Label>
                                        <Input
                                            type="date"
                                            name="choose-date"
                                            id="choose-date"
                                            min={formatDateForInput(new Date())}
                                            max={formatDateForInput(maxDate)}
                                            onChange={onChangeTime}
                                            value={metadata.time}
                                            required="required"
                                        />
                                    </div>
                                </div>

                                <Label for="note"><b>Ghi chú </b></Label>
                                <Input
                                    type="textarea"
                                    name="note"
                                    id="note"
                                    placeholder="Yêu cầu cụ thể (nếu có)"
                                    onChange={onChangeNote}
                                    value={metadata.note}
                                />
                            </div>
                            <hr></hr>
                            <h4>Món ăn</h4>
                            {
                                items.map((item, index) => {
                                    return <CartDishItem key={index} dish={item} calNumTable={calNumTable(customerQuantity, typeTable)} />
                                })
                            }
                            <hr></hr>
                            <h4>Combo món ăn</h4>
                            {items.map((item, index) => {
                                return <CartComboItem key={index} combo={item} calNumTable={calNumTable(customerQuantity, typeTable)} />
                            })}
                            <hr></hr>
                            <h4>Dịch vụ</h4>
                            {items.map((item, index) => {
                                return <CartServiceItem key={index} service={item} />
                            })}
                            <hr></hr>
                            <div className="cart-total-price">Tổng tiền: {formatCurrency(cartTotal) + "  VNĐ"}</div>
                            <Input type="submit" value="Đặt hàng" className="btn btn-success btn-save" />

                        </Form>
                    </ModalBody>
                    <ModalFooter className="cart-footer">
                        <div>
                            {/* <Button onClick={toggleConfirm} color="success">Thanh toán</Button>{' '} */}
                            <Button color="secondary" onClick={toggle}>Quay lại</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}
