import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import {
    Button, CardImg, Modal, Badge, Input,
    ModalHeader, ModalBody, ModalFooter,
    Label
} from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa'

export default function Cart() {
    const [modal, setModal] = useState(false);
    const [typeTable, setTypeTable] = useState(0);
    const [customerQuantity, setCustomerQuantity] = useState(1);
    const toggle = () => setModal(!modal);

    const {
        isEmpty,
        items,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const onchangeTypeTable = (e) => {
        e.preventDefault();
        setTypeTable(e.target.value);
    }

    const onChangeCustomerQuantity = (e) => {
        e.preventDefault();
        setCustomerQuantity(e.target.value);
    }

    if (isEmpty) return (
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
                            <Input
                                type="select"
                                name="type"
                                id="type"
                                onChange={onchangeTypeTable}
                                value={typeTable}
                            >
                                <option value={0}>Chọn loại bàn</option>
                                <option value={6}>Bàn 6</option>
                                <option value={8}>Bàn 8</option>
                            </Input>

                            <Label for="customer-quantity"><b>Số lượng khách:</b></Label>
                            <Input
                                type="number"
                                name="customer-quantity"
                                id="customer-quantity"
                                min="1"
                                onChange={onChangeCustomerQuantity}
                                value={customerQuantity}
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
                    <ModalFooter>
                        <Button color="success">Thanh toán</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Trở lại</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}
