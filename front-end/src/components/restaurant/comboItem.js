import React, { useEffect, useState } from 'react'
import {
    Button, Card, CardImg
} from 'reactstrap';
import { useCart } from 'react-use-cart';
import { api, url } from '../../config/axios';
import { formatCurrency } from '../../common/formatCurrency';
import { Notify } from '../../common/notify';

export default function ComboItem(props) {
    const { addItem, items } = useCart();
    const user = localStorage.getItem('currentUser');
    const combo = props.combo;
    const comboId = props.comboId;

    const [dishes, setDishes] = useState([]);

    const checkAddItem = (combo) => {
        if (items === undefined || items === null || items.length === 0
            || items[0].restaurant_id === combo.restaurant_id) {
            if (user !== undefined && user !== null && user !== '') {
                addItem(combo);
            } else {
                Notify('Bạn phải đăng nhập để thực hiện chức năng này', 'error', 'top-right');
            }
        } else {
            Notify('Bạn phải hoàn tất thanh toán của nhà hàng khác trước khi thêm vào giỏ hàng', 'error', 'top-right');
        }
    }

    useEffect(() => {
        api.get(`/dishes/getDishesByComboId?comboId=${comboId}`)
            .then(res => {
                setDishes(res.data);
            })
    }, [comboId])

    return <Card className="combo-card">
        <div className="combo-name">{combo.combo_name}</div>
        <CardImg className="combo-image" top width="100%" src={url + '/images/' + combo.image_dish_id} />
        <hr />
        <div className="dish-lists">
            {
                dishes.map((dish, index) => {
                    return <div key={index} className="dish-item">
                        {dish.dish_name}
                    </div>
                })
            }
        </div>
        <hr />
        <div className="combo-price">{"Giá combo:  " + formatCurrency(combo.price) + ' VNĐ'}</div>
        <Button
            className="btn-order"
            color="success"
            onClick={() => checkAddItem(combo)}
        >
            Đặt ngay
        </Button>
    </Card>
}
