import React from 'react';
import {
    Button, Card, CardImg, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import { useCart } from 'react-use-cart';
import { formatCurrency } from '../../common/formatCurrency';
import { url } from '../../config/axios';
import { Notify } from '../../common/notify';

export default function ServiceItem(props) {
    const { addItem, items } = useCart();

    const user = localStorage.getItem('currentUser');
    const service = props.service;
    const index = props.index;

    const checkAddItem = (service) => {
        if (items === undefined || items === null || items.length === 0
            || items[0].restaurant_id === service.restaurant_id) {
            if (user !== undefined && user !== null && user !== '') {
                addItem(service);
            } else {
                Notify('Vui lòng đăng nhập để thực hiện chức năng này', 'error', 'top-right');
            }
        } else {
            Notify('Bạn phải hoàn tất thanh toán của nhà hàng khác trước khi thêm vào giỏ hàng', 'error', 'top-right');
        }
    }

    return (
        <div>
            <Card key={index} className="item">
                <CardImg className="service-img" top width="150px" height="200px" src={url + `/images/${service.image_service_id}`} alt="Dịch vụ" />
                <CardBody className="service-content">
                    <CardTitle tag="h5">{service.service_name}</CardTitle>
                    <CardText className="service-price">{formatCurrency(service.price) + ' VNĐ'}</CardText>
                    <Button color="success" onClick={() => checkAddItem(service)}>
                        Thêm vào giỏ
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
