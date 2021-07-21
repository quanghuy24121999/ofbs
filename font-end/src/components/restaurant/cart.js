import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import {
    Button, Modal, Badge, Input, Form,
    ModalHeader, ModalBody, ModalFooter,
    Label, FormGroup
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
    const [linkPaypal, setLinkPaypal] = useState('');

    const toggle = () => {
        setModal(!modal);
        if (!modal) {
            let customerQuantity = metadata.customerQuantity;
            if (customerQuantity === undefined) {
                updateCartMetadata({
                    customerQuantity: 1
                })
            }
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
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();

    const onchangeTypeTable = (e) => {
        e.preventDefault();
        setTypeTable(e.target.value);
        updateCartMetadata({
            type: parseInt(e.target.value)
        })
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
                console.log(err)
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
                                                                            "balanceChange": parseFloat(cartTotal * 0.1),
                                                                            "currentBalance": parseFloat(currentUser.balance) - (parseFloat(cartTotal * 0.1)),
                                                                            "description": "Thanh toán đơn hàng " + orderCode,
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
                                                                                url: `users/updateBalance?balance=${paymentHistory.currentBalance}&userId=${paymentHistory.user.id}`
                                                                            })
                                                                                .then(res => {
                                                                                    Notify('Thanh toán đơn hàng thành công', 'success', 'top-right');
                                                                                    toggle();
                                                                                    toggle1();
                                                                                })
                                                                        })
                                                                    })

                                                                    api.post(`/payment/save`,
                                                                        {
                                                                            "user": admin,
                                                                            "fromToUser": currentUser,
                                                                            "balanceChange": parseFloat(cartTotal * 0.1),
                                                                            "currentBalance": parseFloat(currentUser.balance) + (parseFloat(cartTotal * 0.1)),
                                                                            "description": "Thanh toán đơn hàng " + orderCode,
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
                        <Button color="secondary" onClick={toggle}>Trở lại</Button>
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
                        <Modal isOpen={modal1} toggle={toggle1} className={``}>
                            <ModalHeader toggle={toggle1}>Thông báo</ModalHeader>
                            <ModalBody>
                                <div>
                                    Bạn phải thanh toán cọc <b>10%</b> tổng tiền của đơn hàng.
                                    Số tiền phải thanh toán là <b>{formatCurrency(cartTotal * 0.1) + ' VNĐ'}</b>
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
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={() => {
                                    onSubmitCart();
                                }}>Thanh toán</Button>{' '}
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
                                            value={metadata.customerQuantity}
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
                                    return <CartDishItem key={index} dish={item} />
                                })
                            }
                            <hr></hr>
                            <h4>Combo món ăn</h4>
                            {items.map((item, index) => {
                                return <CartComboItem key={index} combo={item} />
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
                        {/* <Modal isOpen={modalConfirm} toggle={toggleConfirm} className="cart-modal">
                            <ModalHeader toggle={toggleConfirm}>Thông báo</ModalHeader>
                            <ModalBody>
                                Bạn có muốn lưu thay đổi ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={(e) => {
                                    e.preventDefault();
                                    console.log(document.getElementById("cart-form"))
                                    document.getElementById("cart-form").onSubmit();
                                }}>Lưu</Button>
                                <Button color="secondary" onClick={toggleConfirm}>Trở lại</Button>
                            </ModalFooter>
                        </Modal> */}
                        <div>
                            {/* <Button onClick={toggleConfirm} color="success">Thanh toán</Button>{' '} */}
                            <Button color="secondary" onClick={toggle}>Trở lại</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}
