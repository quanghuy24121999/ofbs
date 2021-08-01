import React, { useState } from 'react';
import {
    CardImg, Button, Input
} from 'reactstrap';
import { useCart } from 'react-use-cart';
import { formatCurrency } from '../../common/formatCurrency';
import { url } from '../../config/axios';

export default function CartServiceItem(props) {
    const item = props.service;

    const {
        updateItemQuantity,
        removeItem,
    } = useCart();

    const [quantity, setQuantity] = useState(1);

    const onChangeQuantity = () => {
        const e = document.getElementById('input-quantity-' + item.image_service_id);
        item.quantity = parseInt(e.value);

        setQuantity(item.quantity);
        updateItemQuantity(item.id, item.quantity);

        if (item.quantity === 0) {
            removeItem(item.id);
        } else if (isNaN(item.quantity)) {
            item.quantity = 0;
            setQuantity(item.quantity);
            updateItemQuantity(item.id, item.quantity);
        }
    }

    const increse = () => {
        updateItemQuantity(item.id, item.quantity + 1);
        setQuantity(quantity + 1);
    }

    const decrese = () => {
        updateItemQuantity(item.id, item.quantity - 1);
        setQuantity(quantity - 1);
    }

    return (
        <div>
            {
                item.service_name &&
                (<div className="cart">
                    <div>
                        <CardImg
                            className="cart-dish-img"
                            top
                            src={url + '/images/' + item.image_service_id}
                            alt=""
                        />
                        <div className="cart-detail">
                            <div className="cart-dish-name">{item.service_name}</div>
                            <div className="cart-dish-price">{formatCurrency(item.price) + ' VNĐ'}</div>
                        </div>
                    </div>
                    <div className="cart-group-btn">
                        <Button className="btn-sub" onClick={() => { decrese() }}>
                            -
                        </Button>
                        <div className="cart-dish-quantity">
                            <Input
                                id={`input-quantity-${item.image_service_id}`}
                                className="cart-input-quantity"
                                type="number"
                                min={0}
                                value={quantity}
                                onChange={onChangeQuantity}
                            />
                        </div>
                        <Button className="btn-add" onClick={() => { increse() }} color="success">
                            +
                        </Button>
                        <Button onClick={() => removeItem(item.id)} color="danger">Xoá</Button>
                    </div>
                </div>)
            }
        </div>
    )
}
