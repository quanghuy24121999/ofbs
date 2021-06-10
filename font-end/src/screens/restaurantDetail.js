import React, { Component } from 'react'

import {
    Card, CardBody, Col, Container, Input, Label,
    Nav, NavItem, NavLink, Row, Button, CardImg
} from 'reactstrap';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import StarRatings from "react-star-ratings";
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import axios from 'axios';

export default class restaurantDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            restaurant: {},
            combos: [],
            dishes: [],
            feedbacks: [],
            rating: 0,
            offset: 0,
            perPage: 2,
            currentPage: 0,
            rate: 0
        }

        this.changeRating = this.changeRating.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
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
                this.setState({ restaurant: res.data })
            })

        axios.get(`/restaurants/combos?restaurantId=${restaurantId}`)
            .then(res => {
                let combos = [];
                combos = res.data;
                combos.map(combo => {
                    axios.get(`/restaurants/combos/dishes?comboId=${combo.combo_id}`)
                        .then(res => {
                            this.setState({ dishes: res.data })
                        })
                })

                this.setState({ combos: res.data })
            })

        this.receivedData();
    }

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
        console.log(newRating);
    }

    receivedData() {
        const rate = this.state.rate;
        const restaurantId = this.props.match.params.restaurantId;
        axios.get(`/restaurants/feedbacks?restaurantId=${restaurantId}&rate=${rate}`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                const feedbackPaging = slice.map((feedback) => {
                    return <div className="feedback-item" key={feedback.user_id}>
                        <div className="feedback-user">
                            <CardImg className="user-image" top width="100%" src={'/images/' + feedback.image_user_id} />
                            <div className="username">{feedback.user_name}</div>
                        </div>
                        <div className="user-rating">
                            <StarRatings
                                rating={feedback.rate}
                                starDimension="20px"
                                starSpacing="4px"
                                starRatedColor="#ffe200"
                                numberOfStars={5}
                                className="rating-star"
                            />
                        </div>
                        <div className="user-content">
                            <div className="user-comment"><i>"{feedback.feedback_content}"</i></div>
                            <div className="feedback-date">{feedback.feedback_date}</div>
                        </div>
                    </div>
                })
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    feedbacks: data,
                    feedbackPaging
                })
            })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData();
        });

    };

    onChangeRate(rate) {
        // const element = document.getElementById("all");
        // element.classList.add("active");
        this.setState({ rate: rate })
        const restaurantId = this.props.match.params.restaurantId;
        axios.get(`/restaurants/feedbacks?restaurantId=${restaurantId}&rate=${rate}`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                const feedbackPaging = slice.map((feedback) => {
                    return <div className="feedback-item" key={feedback.user_id}>
                        <div className="feedback-user">
                            <CardImg className="user-image" top width="100%" src={'/images/' + feedback.image_user_id} />
                            <div className="username">{feedback.user_name}</div>
                        </div>
                        <div className="user-rating">
                            <StarRatings
                                rating={feedback.rate}
                                starDimension="20px"
                                starSpacing="4px"
                                starRatedColor="#ffe200"
                                numberOfStars={5}
                                className="rating-star"
                            />
                        </div>
                        <div className="user-content">
                            <div className="user-comment"><i>"{feedback.feedback_content}"</i></div>
                            <div className="feedback-date">{feedback.feedback_date}</div>
                        </div>
                    </div>
                })
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    feedbacks: data,
                    feedbackPaging
                })
            })
    }

    render() {
        const { images, restaurant, combos, feedbacks, dishes } = this.state;

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
                                return <Col className="combo-item" lg="3" md="6" sm="12">
                                    <Card className="combo-card">
                                        <div key={combo.combo_id} className="combo-name">{combo.combo_name}</div>
                                        <CardImg className="combo-image" top width="100%" src={'/images/' + combo.image_combo_id} />
                                        <div className="dish-lists">
                                            {dishes.map(dish => {
                                                return <div key={dish.dish_id} className="dish-item">
                                                    {dish.dish_name}
                                                </div>
                                            })}
                                        </div>
                                        <Button className="btn-order" color="success">Đặt ngay</Button>
                                    </Card>
                                </Col>
                            })}
                        </Row>
                    </div>
                </Container>
                <Container className="feedback">
                    <div className="feedback-title">Bài đánh giá {restaurant.restaurantName} từ khách hàng</div>
                    <div className="feedback-sub-title">
                        <StarRatings
                            rating={restaurant.rate}
                            starDimension="30px"
                            starSpacing="4px"
                            starRatedColor="#ffe200"
                            numberOfStars={5}
                            className="rating-star"
                        />
                        <div className="feedback-description"><b>{restaurant.rate}/5</b> dựa trên {feedbacks.length} đánh giá</div>
                    </div>
                    <div className="send-feedback">
                        <Label className="send-feedback-title" for="feedback"><b>Đánh giá: </b></Label>
                        <Input type="text" id="feedback" placeholder="Nhập đánh giá của bạn" name="feedback" className="feedback-comment" />
                        <div className="feedback-star">
                            <StarRatings
                                rating={this.state.rating}
                                starDimension="30px"
                                starSpacing="4px"
                                starRatedColor="#ffe200"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name="rating"
                                starHoverColor="#ffe200"
                            />
                        </div>
                        <Button className="btn-feedback" color="success">Đánh giá</Button>
                    </div>
                    <div className="feedback-content">
                        <Nav pills className="star-rating-nav">
                            <NavItem onClick={() => this.onChangeRate(0)}>
                                <NavLink active id="all" >Tất cả</NavLink>
                            </NavItem>
                            <NavItem onClick={() => this.onChangeRate(5)}>
                                <NavLink id="5" >5 sao</NavLink>
                            </NavItem>
                            <NavItem onClick={() => this.onChangeRate(4)}>
                                <NavLink id="4" >4 sao</NavLink>
                            </NavItem>
                            <NavItem onClick={() => this.onChangeRate(3)}>
                                <NavLink id="3" >3 sao</NavLink>
                            </NavItem>
                            <NavItem onClick={() => this.onChangeRate(2)}>
                                <NavLink id="2" >2 sao</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink id="1" onClick={() => this.onChangeRate(1)}>1 sao</NavLink>
                            </NavItem>
                        </Nav>
                        <div className="feedback-list">
                            {this.state.feedbackPaging}
                        </div>
                        <ReactPaginate
                            previousLabel={"Trang trước"}
                            nextLabel={"Trang sau"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={5}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}
