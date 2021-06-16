import React from 'react'
import {
    Button, Card, CardImg, CardTitle, Col
} from 'reactstrap';
import { useCart } from 'react-use-cart';

export default function ComboItem(props) {
    const { addItem } = useCart();

    const combo = props.combo;
    const dishes = props.dishes;
    const index = props.index;

    return <Col key={index} className="combo-item" lg="3" md="6" sm="12">
        <Card className="combo-card">
            <div className="combo-name">{combo.dish_name}</div>
            <CardImg className="combo-image" top width="100%" src={'/images/' + combo.image_dish_id} />
            <div className="dish-lists">
                {dishes.map((dish, index) => {
                    return <div key={index} className="dish-item">
                        {dish.dish_name}
                    </div>
                })}
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
    </Col>
}
