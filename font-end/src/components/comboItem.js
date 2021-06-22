import React, { useEffect, useState } from 'react'
import {
    Button, Card, CardImg,
} from 'reactstrap';
import { useCart } from 'react-use-cart';
import axios from 'axios';

export default function ComboItem(props) {
    const { addItem } = useCart();

    const combo = props.combo;
    const comboId = props.comboId;

    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get(`/restaurants/combos/dishes?comboId=${comboId}`)
            .then(res => {
                setDishes(res.data);
            })
    }, [comboId])

    return <Card className="combo-card">
        <div className="combo-name">{combo.combo_name}</div>
        <CardImg className="combo-image" top width="100%" src={'/images/' + combo.image_dish_id} />
        <div className="dish-lists">
            {
                dishes.map((dish, index) => {
                    return <div key={index} className="dish-item">
                        {dish.dish_name}
                    </div>
                })
            }
        </div>
        <div className="combo-price">{"Giá combo:  " + combo.price + ' VNĐ'}</div>
        <Button
            className="btn-order"
            color="success"
            onClick={() => addItem(combo)}
        >
            Đặt ngay
        </Button>
    </Card>
}
