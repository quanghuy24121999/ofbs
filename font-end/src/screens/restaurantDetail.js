import React, { Component } from 'react'

import {
    Container, Input, Label,
    Nav, NavItem, NavLink, Button,
    Modal, ModalHeader, ModalBody,
    ModalFooter
} from 'reactstrap';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import StarRatings from "react-star-ratings";
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { Redirect, Link } from "react-router-dom";

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import axios from 'axios';

import Cart from '../components/cart';
import StarRating from '../components/starRating';
import FeedbackItem from '../components/feedbackItem';
import { onChangeRate } from '../common/changeLink';

export default class restaurantDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            restaurant: {},
            feedbacks: [],
            rating: 1,
            offset: 0,
            perPage: 2,
            currentPage: 0,
            rate: 0,
            textFeedback: '',
            displayModal: false,
            moveToLogin: false
        }

        this.changeRating = this.changeRating.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
        this.onChangeTextFeedback = this.onChangeTextFeedback.bind(this);
        this.onSubmitFeedback = this.onSubmitFeedback.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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
                    return imageArr.push(imageObject);
                })
                this.setState({
                    images: imageArr
                })
            })

        axios.get(`/restaurants/detail?restaurantId=${restaurantId}`)
            .then(res => {
                this.setState({ restaurant: res.data })
            })

        this.receivedData();
    }

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }

    receivedData() {
        const restaurantId = this.props.match.params.restaurantId;
        axios.get(`/restaurants/feedbacks?restaurantId=${restaurantId}&rate=${this.state.rate}`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const feedbackPaging = slice.map((feedback, index) => {
                    return <div key={index}>
                        <FeedbackItem feedback={feedback} />
                    </div>
                })
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    feedbacks: data,
                    feedbackPaging
                })
            })
    }

    toggleModal() {
        this.setState({
            displayModal: !this.state.displayModal
        })
    }

    onChangeTextFeedback(e) {
        this.setState({
            textFeedback: e.target.value
        });
    }

    onSubmitFeedback(e) {
        e.preventDefault();
        let isAuthen = this.isAuthentication();


        if (!isAuthen) {
            this.toggleModal();

        } else {
            axios.get(`/users/findByPhoneNumber/${localStorage.getItem('currentUser')}`)
                .then(res => {
                    const currentUser = res.data;
                    const { textFeedback, rating } = this.state;
                    axios({
                        method: 'post',
                        url: `/restaurants/insertFeedback`,
                        data: {
                            "feedback_content": textFeedback,
                            "user_id": currentUser.id,
                            "rate": rating,
                            "restaurant_id": this.props.match.params.restaurantId
                        }
                    }).then(res => {
                        this.receivedData()
                    }
                    );
                })
        }
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
        onChangeRate(rate);
        this.setState({
            offset: 0,
            rate: rate
        }, () => {
            const restaurantId = this.props.match.params.restaurantId;
            axios.get(`/restaurants/feedbacks?restaurantId=${restaurantId}&rate=${rate}`)
                .then(res => {
                    const data = res.data;
                    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                    const feedbackPaging = slice.map((feedback, index) => {
                        return <div key={index}>
                            <FeedbackItem feedback={feedback} />
                        </div>
                    })
                    this.setState({
                        pageCount: Math.ceil(data.length / this.state.perPage),
                        feedbacks: data,
                        feedbackPaging
                    })
                })
        });
    }

    isAuthentication() {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser !== null && currentUser !== undefined) {
            return true
        } else {
            return false;
        }
    }

    moveToLogin = (e) => {
        e.preventDefault();
        this.setState({
            moveToLogin: true
        });
    }

    render() {
        const { images, restaurant, feedbacks, textFeedback,
            rating, displayModal, moveToLogin
        } = this.state;
        const restaurantId = this.props.match.params.restaurantId;

        return (
            <div>
                <Modal isOpen={displayModal} toggle={this.toggleModal} className="">
                    <ModalHeader toggle={this.toggleModal}>Thông báo</ModalHeader>
                    <ModalBody>
                        Bạn phải đăng nhập để thực hiện chức năng này
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.moveToLogin}>Đăng nhập</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Quay lại</Button>
                    </ModalFooter>
                </Modal>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem className="active">
                        <Link to={`/restaurant-detail/${restaurantId}`}>Nhà hàng</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/restaurant-detail/${restaurantId}/menu`}  >Thực đơn</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/restaurant-detail/${restaurantId}/combo`}  >Combo</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/restaurant-detail/${restaurantId}/service`}>Dịch vụ</Link>
                    </NavItem>
                </Nav>
                <Cart />
                <Container className="image-slide">
                    <ImageGallery items={images} />
                </Container>
                <Container className="restaurant-detail-content">
                    <div className="restauran-detail-header">
                        <div className="restauran-detail-name">{restaurant.restaurantName}</div>
                        <div className="restauran-detail-rate">
                            <StarRating rate={restaurant.rate} starDimension="30" starSpacing="4" />
                        </div>
                    </div>
                    <div className="restauran-detail-location">
                        <FaMapMarkerAlt className="i-location" /> {restaurant.province}
                    </div>
                    <div className="restauran-detail-description">{restaurant.description}</div>
                </Container>

                <Container className="feedback">
                    <div className="feedback-title">Bài đánh giá {restaurant.restaurantName} từ khách hàng</div>
                    <div className="feedback-sub-title">
                        <StarRating rate={restaurant.rate} starDimension="30" starSpacing="4" />
                        <div className="feedback-description"><b>{restaurant.rate}/5</b> dựa trên {feedbacks.length} đánh giá</div>
                    </div>
                    <div className="send-feedback">
                        <Label
                            className="send-feedback-title"
                            for="feedback"
                            onChange={this.onChangeTextFeedback}
                        >
                            <b>Đánh giá: </b>
                        </Label>
                        <Input
                            type="textarea"
                            id="feedback"
                            placeholder="Nhập đánh giá của bạn"
                            name="feedback"
                            className="feedback-comment"
                            onChange={this.onChangeTextFeedback}
                            value={textFeedback}
                        />
                        <div className="feedback-star">
                            <StarRatings
                                rating={rating}
                                starDimension="30px"
                                starSpacing="4px"
                                starRatedColor="#ffe200"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name="rating"
                                starHoverColor="#ffe200"
                            />
                        </div>
                        <Button className="btn-feedback" onClick={this.onSubmitFeedback} color="success">Đánh giá</Button>
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
                            <NavItem onClick={() => this.onChangeRate(1)}>
                                <NavLink id="1" >1 sao</NavLink>
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
                {
                    moveToLogin && <Redirect to={{
                        pathname: "/login"
                    }} />
                }
            </div>
        )
    }
}
