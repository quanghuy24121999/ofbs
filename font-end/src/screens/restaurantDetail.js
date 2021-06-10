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
            feedbacks: [],
            rating: 0,
            offset: 0,
            perPage: 1,
            currentPage: 0,
            rate: 0
        }

        this.changeRating = this.changeRating.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onChangeRateAll = this.onChangeRateAll.bind(this);
        this.onChangeRateFive = this.onChangeRateFive.bind(this);
        this.onChangeRateFour = this.onChangeRateFour.bind(this);
        this.onChangeRateThree = this.onChangeRateThree.bind(this);
        this.onChangeRateTwo = this.onChangeRateAll.bind(this);
        this.onChangeRateOne = this.onChangeRateAll.bind(this);
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
                    return <div key={feedback.user_id}>
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
                            <div className="user-comment">{feedback.feedback_content}</div>
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

    onChangeRateAll() {
        this.setState({ rate: 0 })
        this.receivedData();
    }

    onChangeRateFive() {
        this.setState({ rate: 5 })
        this.receivedData();
    }

    onChangeRateFour() {
        this.setState({ rate: 4 })
        this.receivedData();
    }

    onChangeRateThree() {
        this.setState({ rate: 3 })
        this.receivedData();
    }

    onChangeRateTwo() {
        this.setState({ rate: 2 })
        this.receivedData();
    }

    onChangeRateOne() {
        this.setState({ rate: 1 })
        this.receivedData();
    }

    render() {
        const { images, restaurant, combos, feedbacks } = this.state;

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
                                return <Col lg="3" md="6" sm="12">
                                    <div key={combo.combi_id} className="combo-name">{combo.combo_name}</div>
                                    <Card className="dish">
                                        <CardBody>

                                        </CardBody>
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
                        <span>{restaurant.rate}/5 dựa trên {feedbacks.length} đánh giá</span>
                        <div className="send-feedback">
                            <Label for="feedback"><b>Đánh giá: </b></Label>
                            <Input type="text" id="feedback" name="feedback" className="feedback-comment" />
                            <StarRatings
                                rating={this.state.rating}
                                starRatedColor="#ffe200"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name="rating"
                                starHoverColor="#ffe200"
                            />
                            <Button color="success">Đánh giá</Button>
                        </div>
                        <div className="feedback-content">
                            <Nav pills className="star-rating-nav">
                                <NavItem>
                                    <NavLink onClick={this.onChangeRateAll} active>Tất cả</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onChangeRateFive}>5 sao</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onChangeRateFour}>4 sao</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onChangeRateThree}>3 sao</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onChangeRateTwo}>2 sao</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.onChangeRateOne}>1 sao</NavLink>
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
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}
