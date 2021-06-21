import React from 'react'
import {
    Button, Card, CardImg, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { useCart } from 'react-use-cart';

export default function ServiceItem(props) {
    const { addItem } = useCart();
    const service = props.service;
    const index = props.index;
    return (
        <div>
            <Card key={index} className="item">
                <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                <CardBody className="service-content">
                    <CardTitle tag="h5">{service.service_name}</CardTitle>
                    <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                    <Button color="success" onClick={() => addItem(service)}>
                        Thêm vào giỏ
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
