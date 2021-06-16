import React from 'react'
import {
    Button, Card, CardImg, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { useCart } from 'react-use-cart';

export default function Dish(props) {
    const { addItem } = useCart();
    const dish = props.dish;
    return (
        <div>
            <Card key={dish.id} className="item">
                <CardImg className="dish-img" top width="150px" height="200px" src={'/images/' + dish.image_dish_id} alt="Nhà hàng" />
                <CardBody className="dish-content">
                    <CardTitle tag="h5">{dish.dish_name}</CardTitle>
                    <CardText className="dish-price">{dish.price + ' VNĐ'}</CardText>
                    <Button color="success" onClick={() => addItem(dish)}>
                        Thêm vào giỏ
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
