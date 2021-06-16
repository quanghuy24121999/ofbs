import React from 'react';
import { CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function PromotionItem(props) {
    const promotion = props.promotion;
    return (
        <div className="promotion-item">
            <div className="promotion-item-info">
                <div>
                    <div className="promotion-item-header">{promotion.promotion_name}</div>
                    <div className="promotion-item-description">{promotion.description}</div>
                    <div className="promotion-item-date">
                        {"Ưu đãi từ " + promotion.start_date + " đến " + promotion.end_date}
                    </div>
                </div>
                <Link to={"/restaurant-detail/" + promotion.restaurant_id} className="link-to-restaurant">
                    Đi đến nhà hàng
                </Link>
            </div>
            <CardImg
                className="promotion-item-img"
                top
                width="200px"
                height="300px"
                src={'/images/' + promotion.image_id} alt=""
            />
        </div>
    )
}
