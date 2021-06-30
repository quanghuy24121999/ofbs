import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import {
    Button, CardImg, Modal, Badge, Input,
    ModalHeader, ModalBody, ModalFooter,
    Label
} from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa'
import axios from 'axios';

export default function Cart(props) {
    const [modal, setModal] = useState(false);
    const [modalConfirm, setModalComfirm] = useState(false);
    const [typeTable, setTypeTable] = useState(0);
    const [customerQuantity, setCustomerQuantity] = useState(1);
    const [period, setPeriod] = useState('');
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');
    const toggle = () => setModal(!modal);
    const toggleConfirm = () => setModalComfirm(!modalConfirm);

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

    const onSubmitCart = (e) => {
        e.preventDefault();
        let customerId;
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

        axios.get(`/users/findByPhoneNumber/${localStorage.getItem('currentUser')}`)
            .then(res => {
                customerId = res.data.id
                axios.post(`/orders/insertOrder`, {
                    "time": period,
                    "organizeDate": time,
                    "customerId": parseInt(customerId),
                    "restaurantId": parseInt(restaurantId),
                    "tableType": parseInt(typeTable),
                    "numberOfGuests": customerQuantity,
                    "note": note
                }).then(res => {
                    items.forEach(item => {
                        if (item.dish_name) {
                            object = {};
                            object.quantity = item.quantity;
                            object.dishId = item.id;
                            object.comboId = 0;
                            object.serviceId = 0;
                            object.customerId = parseInt(customerId);
                            object.restaurantId = parseInt(restaurantId);

                            arr.push(object);
                        }

                        else if (item.combo_name) {
                            object = {};
                            object.quantity = item.quantity;
                            object.dishId = 0;
                            object.comboId = item.id;
                            object.serviceId = 0;
                            object.customerId = parseInt(customerId);
                            object.restaurantId = parseInt(restaurantId);

                            arr.push(object);
                        }

                        else if (item.service_name) {
                            object = {};
                            object.quantity = item.quantity;
                            object.dishId = 0;
                            object.comboId = 0;
                            object.serviceId = item.id;
                            object.customerId = parseInt(customerId);
                            object.restaurantId = parseInt(restaurantId);

                            arr.push(object);
                        }
                    })

                    let json = JSON.stringify(arr);
                    const config = {
                        headers: { 'Content-Type': 'application/json' }
                    }

                    axios.post(`/orders/insertOrderDetail`, json, config).then(res => {
                    }).then(res => {
                        axios.patch(`/orders/setStatus?customerId=${customerId}&restaurantId=${restaurantId}`)
                            .then(res => {
                                updateCartMetadata({
                                    customerQuantity: 1,
                                    period: "",
                                    time: "",
                                    type: 0
                                })

                                emptyCart();
                                setModalComfirm(!modalConfirm);
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
                        <div className="cart-option">
                            <h3>Tùy chọn</h3>
                            <div className="cart-select">
                                <Input
                                    type="select"
                                    name="type"
                                    id="type"
                                    onChange={onchangeTypeTable}
                                    value={metadata.type}
                                >
                                    <option value={0}>Chọn loại bàn</option>
                                    <option value={6}>Bàn 6</option>
                                    <option value={8}>Bàn 8</option>
                                </Input>

                                <Input
                                    type="select"
                                    name="period"
                                    id="period"
                                    onChange={onchangePeriod}
                                    value={metadata.period}
                                >
                                    <option value={``}>Chọn buổi </option>
                                    <option value={'Trưa'}>Trưa</option>
                                    <option value={'Tối'}>Tối</option>
                                </Input>
                            </div>

                            <div className="cart-other-option">
                                <div>
                                    <Label for="customer-quantity"><b>Số lượng khách:</b></Label>
                                    <Input
                                        type="number"
                                        name="customer-quantity"
                                        id="customer-quantity"
                                        min={1}
                                        onChange={onChangeCustomerQuantity}
                                        value={metadata.customerQuantity}
                                    />
                                </div>

                                <div>
                                    <Label for="choose-date"><b>Chọn ngày:</b></Label>
                                    <Input
                                        type="date"
                                        name="choose-date"
                                        id="choose-date"
                                        onChange={onChangeTime}
                                        value={metadata.time}
                                    />
                                </div>
                            </div>

                            <Label for="note"><b>Ghi chú:</b></Label>
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
                        <h3>Món ăn</h3>
                        {items.map((item, index) => {
                            return <div key={index} >
                                {
                                    item.dish_name &&
                                    (<div className="cart">
                                        <CardImg
                                            className="cart-dish-img"
                                            top
                                            src={'/images/' + item.image_dish_id}
                                            alt=""
                                        />
                                        <div className="cart-detail">
                                            <div className="cart-dish-name">{item.dish_name}</div>
                                            <div className="cart-dish-price">{item.price + ' VNĐ'}</div>
                                        </div>
                                        <div className="cart-group-btn">
                                            <Button className="btn-sub" onClick={() => { updateItemQuantity(item.id, item.quantity - 1) }}>-</Button>
                                            <div className="cart-dish-quantity">
                                                {item.quantity}
                                            </div>
                                            <Button className="btn-add" onClick={() => updateItemQuantity(item.id, item.quantity + 1)} color="success">+</Button>
                                            <Button onClick={() => removeItem(item.id)} color="danger">Xoá</Button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        })}
                        <hr></hr>
                        <h3>Combo món ăn</h3>
                        {items.map((item, index) => {
                            return <div key={index} >
                                {
                                    item.combo_name &&
                                    (<div className="cart">
                                        <CardImg
                                            className="cart-dish-img"
                                            top
                                            src={'/images/' + item.image_dish_id}
                                            alt=""
                                        />
                                        <div className="cart-detail">
                                            <div className="cart-dish-name">{item.combo_name}</div>
                                            <div className="cart-dish-price">{item.price + ' VNĐ'}</div>
                                        </div>
                                        <div className="cart-group-btn">
                                            <Button className="btn-sub" onClick={() => { updateItemQuantity(item.id, item.quantity - 1) }}>-</Button>
                                            <div className="cart-dish-quantity">
                                                {item.quantity}
                                            </div>
                                            <Button className="btn-add" onClick={() => updateItemQuantity(item.id, item.quantity + 1)} color="success">+</Button>
                                            <Button onClick={() => removeItem(item.id)} color="danger">Xoá</Button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        })}
                        <hr></hr>
                        <h3>Dịch vụ</h3>
                        {items.map((item, index) => {
                            return <div key={index} >
                                {
                                    item.service_name &&
                                    (<div className="cart">
                                        <CardImg
                                            className="cart-dish-img"
                                            top
                                            src={'/images/' + item.image_service_id}
                                            alt=""
                                        />
                                        <div className="cart-detail">
                                            <div className="cart-dish-name">{item.service_name}</div>
                                            <div className="cart-dish-price">{item.price + ' VNĐ'}</div>
                                        </div>
                                        <div className="cart-group-btn">
                                            <Button className="btn-sub" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
                                            <div className="cart-dish-quantity">{item.quantity}</div>
                                            <Button className="btn-add" onClick={() => updateItemQuantity(item.id, item.quantity + 1)} color="success">+</Button>
                                            <Button onClick={() => removeItem(item.id)} color="danger">Xoá</Button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        })}
                        <hr></hr>
                        <div className="cart-total-price">Tổng tiền: {cartTotal + "  VNĐ"}</div>
                    </ModalBody>
                    <ModalFooter className="cart-footer">
                        <Modal isOpen={modalConfirm} toggle={toggleConfirm} className="cart-modal">
                            <ModalHeader toggle={toggleConfirm}>Thông báo</ModalHeader>
                            <ModalBody>
                                Bạn có muốn lưu thay đổi ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={onSubmitCart}>Lưu</Button>
                                <Button color="secondary" onClick={toggleConfirm}>Trở lại</Button>
                            </ModalFooter>
                        </Modal>
                        <div>
                            <Button onClick={toggleConfirm} color="success">Thanh toán</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Trở lại</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}
