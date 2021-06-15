import React from 'react'
import {
    Button, Card, CardImg, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { useCart } from 'react-use-cart';

export default function Dish(props) {
    const { addItem } = useCart();
    return (
        <div>
            <Card key={props.dish.id} className="item">
                <CardImg className="dish-img" top width="150px" height="200px" src={'/images/' + props.dish.image_dish_id} alt="Nhà hàng" />
                <CardBody className="dish-content">
                    <CardTitle tag="h5">{props.dish.dish_name}</CardTitle>
                    <CardText className="dish-price">{props.dish.price + ' VNĐ'}</CardText>
                    <Button color="success" onClick={() => addItem(props.dish)}>
                        Thêm vào giỏ
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
