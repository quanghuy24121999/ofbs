import React from 'react';
import {
    CardImg, Card, CardTitle, CardText,
    CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';

import StarRating from './starRating';

export default function RestaurantItem(props) {
    const restaurant = props.restaurant;
    return (
        <Card key={restaurant.restaurantId} className="item">
            <CardImg className="restaurant-img" top width="100%" src={'/images/' + restaurant.imageId} alt="Nhà hàng" />
            <CardBody className="restaurant-content">
                <CardTitle tag="h5">{restaurant.restaurantName}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{restaurant.province}</CardSubtitle>
                <CardText className="restaurant-size">{'Khoảng ' + restaurant.size + ' người'}</CardText>
                <StarRating rate={restaurant.rate} starDimension="20px" starSpacing="4px" />
                <Link to={"/restaurant-detail/" + restaurant.restaurantId} className="btn btn-success">Xem thêm</Link>
            </CardBody>
        </Card>
    )
}
