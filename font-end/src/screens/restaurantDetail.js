import React, { Component } from 'react'

import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import StarRatings from "react-star-ratings";
import { FaMapMarkerAlt } from 'react-icons/fa';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import axios from 'axios';

export default class restaurantDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            restaurant: {},
            combos: []
        }
    }

    componentDidMount() {
        let imageArr = [];
        const restaurantId = this.props.match.params.restaurantId;

        axios.get(`/images/getRestaurantImages?restaurantId=${restaurantId}`)
            .then(res => {
                const images = res.data;
                images.map(image => {
                    let imageObject = {
                        original: '/images/' + image.image_id,
                        thumbnail: '/images/' + image.image_id
                    }
                    imageArr.push(imageObject);
                })
                this.setState({
                    images: imageArr
                })
            })

        axios.get(`/restaurants/detail?restaurantId=${restaurantId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ restaurant: res.data })
            })

        axios.get(`/restaurants/combos?restaurantId=${restaurantId}`)
            .then(res => {
                this.setState({ combos: res.data })
            })
    }

    render() {
        const { images, restaurant, combos } = this.state;

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav">
                    <NavItem>
                        <NavLink href="#" active>Nhà hàng</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Thực đơn</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Dịch vụ</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Đánh giá</NavLink>
                    </NavItem>
                </Nav>
                <Container className="image-slide">
                    <ImageGallery items={images} />
                </Container>
                <Container className="restaurant-detail-content">
                    <div className="restauran-detail-header">
                        <div className="restauran-detail-name">{restaurant.restaurantName}</div>
                        <div className="restauran-detail-rate">
                            <StarRatings
                                rating={restaurant.rate}
                                starDimension="30px"
                                starSpacing="4px"
                                starRatedColor="#ffe200"
                                numberOfStars={5}
                                className="rating-star"
                            />
                        </div>
                    </div>
                    <div className="restauran-detail-location">
                        <FaMapMarkerAlt className="i-location" /> {restaurant.province}
                    </div>
                    <div className="restauran-detail-description">{restaurant.description}</div>
                </Container>
                <Container className="restaurant-detail-combo">
                    <div className="combo-header">
                        <div className="combo-header-text">Chọn combo để được giảm giá</div>
                        <div className="combo-header-menu">Tự chọn Menu</div>
                    </div>
                    <div className="combo-content">
                        <Row>
                            {combos.map(combo => {
                                return <Col>
                                    <div className="combo-name">{combo.combo_name}</div>

                                </Col>
                            })}
                        </Row>
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}
