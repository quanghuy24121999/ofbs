import React from 'react';
import {
    Button, Card, CardImg, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { useCart } from 'react-use-cart';
import { formatCurrency } from '../../common/formatCurrency';
import { url } from '../../config/axios';
import { Notify } from '../../common/notify';

export default function Dish(props) {
    const { addItem, items } = useCart();
    const dish = props.dish;
    const user = localStorage.getItem('currentUser');

    const checkAddItem = (dish) => {
        if (items === undefined || items === null || items.length === 0
            || items[0].restaurant_id === dish.restaurant_id) {
            if (user !== undefined && user !== null && user !== '') {
                addItem(dish);
            } else {
                Notify('Vui lòng đăng nhập để thực hiện chức năng này', 'error', 'top-right');
            }
        } else {
            Notify('Bạn phải hoàn tất thanh toán của nhà hàng khác trước khi thêm vào giỏ hàng', 'error', 'top-right');
        }
    }

    return (
        <div>
            <Card key={dish.id} className="item">
                <CardImg className="dish-img" top width="150px" height="200px" src={url + '/images/' + dish.image_dish_id} alt="Nhà hàng" />
                <CardBody className="dish-content">
                    <CardTitle tag="h5">{dish.dish_name}</CardTitle>
                    <CardText className="dish-price">{formatCurrency(dish.price) + ' VNĐ'}</CardText>
                    <Button color="success" onClick={() => checkAddItem(dish)}>
                        Thêm vào giỏ
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
