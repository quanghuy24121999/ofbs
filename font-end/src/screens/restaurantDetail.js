import React, { Component } from 'react'

import {
    Container, Input, Label,
    Nav, NavItem, NavLink, Row, Button, CardImg,
    Modal,
    ModalHeader,
    ModalBody,
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

import imageUser from '../images/default-avatar-user.png';
import ComboItem from '../components/comboItem';
import Cart from '../components/cart';

export default class restaurantDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            restaurant: {},
            combos: [],
            dishes: [],
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
                let combosTemp = res.data;

                this.modifiedCombo(combosTemp);

                combosTemp.map(combo => {
                    axios.get(`/restaurants/combos/dishes?comboId=${combo.id}`)
                        .then(res => {
                            this.setState({ dishes: res.data })
                        })
                })
                this.setState({ combos: combosTemp })
            })

        this.receivedData();
    }

    modifiedCombo(combos) {
        for (let i = 0; i < combos.length; i++) {
            combos[i].id = combos[i]['combo_id'];
            delete combos[i].combo_id;

            combos[i].dish_name = combos[i]['combo_name'];
            delete combos[i].combo_name;

            combos[i].price = combos[i]['combo_price'];
            delete combos[i].combo_price;

            combos[i].image_dish_id = combos[i]['image_combo_id'];
            delete combos[i].image_combo_id;
        }
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
                const feedbackPaging = slice.map((feedback) => {
                    return <div key={feedback.feedback_date} className="feedback-item">
                        <div className="feedback-user">
                            {feedback.image_user_id ? (
                                <CardImg className="user-image" top width="100%" src={'/images/' + feedback.image_user_id} />
                            ) : (
                                <CardImg className="user-image" top width="100%" src={imageUser} />
                            )}
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
                        console.log(res.data)
                    });
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

        this.setState({
            offset: 0,
            rate: rate
        }, () => {
            const restaurantId = this.props.match.params.restaurantId;
            axios.get(`/restaurants/feedbacks?restaurantId=${restaurantId}&rate=${rate}`)
                .then(res => {
                    const data = res.data;
                    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                    const feedbackPaging = slice.map((feedback) => {
                        return <div className="feedback-item" key={feedback.feedback_date}>
                            <div className="feedback-user">
                                {feedback.image_user_id ? (
                                    <CardImg className="user-image" top width="100%" src={'/images/' + feedback.image_user_id} />
                                ) : (
                                    <CardImg className="user-image" top width="100%" src={imageUser} />
                                )}
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
        const { images, restaurant, combos, feedbacks, dishes, textFeedback,
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
                    <NavItem>
                        <NavLink href="#" active><Link>Nhà hàng</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to={`/restaurant-detail/${restaurantId}/menu`}  >Thực đơn</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"><Link to={`/restaurant-detail/${restaurantId}/service`}>Dịch vụ</Link></NavLink>
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
                            {combos.map((combo, index) => {
                                return <ComboItem combo={combo} dishes={dishes} index={index} />
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
