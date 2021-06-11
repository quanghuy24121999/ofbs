import { Component } from 'react';
import {
    CardImg, Row, Form, FormGroup,
    Input, Label, Button, Card, CardTitle, CardText,
    CardSubtitle, CardBody, Container
} from 'reactstrap';

import axios from 'axios';
import subVn from "sub-vn";
import StarRatings from "react-star-ratings";
import Carousel from 'react-multi-carousel';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import { Redirect } from 'react-router';
import wallpaper from '../images/wallpaper.png';
import { Link } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 4,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
    }
}
export default class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            provinces: subVn.getProvinces(),
            districts: [],
            restaurantsType1: [],
            restaurantsType2: [],
            restaurantName: '',
            provinceName: '',
            districtName: '',
            type: 0,
            searchObject: {
                restaurantName: '',
                province: '',
                district: '',
                type: 0
            },
            isSubmit: false,
            restaurantId: ''
        };
        this.onProvinceClick = this.onProvinceClick.bind(this);
        this.onChangeRestaurantName = this.onChangeRestaurantName.bind(this);
        this.onDistrictClick = this.onDistrictClick.bind(this);
        this.onChangeCheckboxTypeOne = this.onChangeCheckboxTypeOne.bind(this);
        this.onChangeCheckboxTypeTwo = this.onChangeCheckboxTypeTwo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeRestaurantName(event) {
        event.preventDefault();
        event.preventDefault();
        localStorage.setItem("restaurantText", event.target.value);
        this.setState({ restaurantName: event.target.value })
    }

    onProvinceClick(event) {
        event.preventDefault();
        let provinceCode = event.target.value;
        this.setState({
            districts: subVn.getDistrictsByProvinceCode(provinceCode)
        });

        let index = event.nativeEvent.target.selectedIndex;
        let provinceName = event.nativeEvent.target[index].text;
        localStorage.setItem("provinceCode", provinceCode);
        localStorage.setItem("provinceName", provinceName);
        this.setState({ provinceName: event.target.value })
    }

    onDistrictClick(event) {
        event.preventDefault();
        let index = event.nativeEvent.target.selectedIndex;
        let districtName = event.nativeEvent.target[index].text;
        localStorage.setItem("districtName", districtName);
        this.setState(this.setState({ districtName: event.target.value }));
    }

    onChangeCheckboxTypeOne(event) {
        let check = event.target.checked;
        let cbTypeTwo = document.getElementById('cbTypeTwo');

        if (check) {
            localStorage.setItem("type", 1);
            this.setState({ type: 1 })
        } if ((check && cbTypeTwo.checked) || (!check && !cbTypeTwo.checked)) {
            localStorage.setItem("type", 0);
            this.setState({ type: 0 })
        }

        if (!check && cbTypeTwo.checked) {
            localStorage.setItem("type", 2);
            this.setState({ type: 2 })
        }
    }

    onChangeCheckboxTypeTwo(event) {
        let check = event.target.checked;
        let cbTypeOne = document.getElementById('cbTypeOne');

        if (check) {
            localStorage.setItem("type", 2);
            this.setState({ type: 2 })
        }
        if ((check && cbTypeOne.checked) || (!check && !cbTypeOne.checked)) {
            localStorage.setItem("type", 0);
            this.setState({ type: 0 })
        }

        if (!check && cbTypeOne.checked) {
            localStorage.setItem("type", 1);
            this.setState({ type: 1 })
        }
    }

    onSubmit(e) {
        this.setState({ isSubmit: true })
    }

    componentDidMount() {
        axios.get('/restaurants/1')
            .then(res => {
                this.setState({ restaurantsType1: res.data })
            })
        axios.get('/restaurants/2')
            .then(res => {
                this.setState({ restaurantsType2: res.data })
            })
    }

    render() {
        let { provinces, districts, restaurantsType1,
            restaurantsType2, searchObject, isSubmit,
            restaurantName
        } = this.state;

        return (
            <div className="home-container">
                <TopMenu />
                <div className="wallpaper">
                    <CardImg className="image" src={wallpaper} alt="Wallpaper" />
                    <div className="home-title">Feast Booking</div>
                </div>
                <div className="home-search">
                    <Form className="search-form">
                        <FormGroup>
                            <Input
                                type="text"
                                name="text"
                                id="text-search"
                                placeholder="Tìm kiếm"
                                value={localStorage.getItem("restaurantText")}
                                onChange={this.onChangeRestaurantName}
                            />
                        </FormGroup>
                        <div className="search-location">
                            <FormGroup className="citySelect">
                                <Label for="citySelect"><b>Chọn tỉnh/ thành phố:</b></Label>
                                <Input
                                    type="select"
                                    name="citySelect"
                                    id="citySelect"
                                    value={localStorage.getItem("provinceCode")}
                                    onChange={this.onProvinceClick}
                                >
                                    <option>Tỉnh/ Thành phố</option>
                                    {provinces.map((province) => {
                                        return (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className="districtSelect">
                                <Label for="districtSelect"><b>Chọn quận/ huyện: </b></Label>
                                <Input
                                    type="select"
                                    name="districtSelect"
                                    id="districtSelect"
                                    // value={localStorage.getItem("districtIndex")}
                                    onChange={this.onDistrictClick}
                                >
                                    <option>Quận/ Huyện</option>
                                    {districts.map((district) => {
                                        return (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="search-other">
                            <FormGroup className="search-other-cb1" check>
                                <Label check>
                                    <Input
                                        id="cbTypeOne"
                                        type="checkbox"
                                        onChange={this.onChangeCheckboxTypeOne}
                                    /> Tiệc lưu động
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        id="cbTypeTwo"
                                        type="checkbox"
                                        onChange={this.onChangeCheckboxTypeTwo}
                                    /> Tiệc tại trung tâm
                            </Label>
                            </FormGroup>
                        </div>
                        <Input onClick={this.onSubmit} type="submit" className="btn btn-success btn-search" value="Tìm kiếm" />
                    </Form>

                </div>
                <div className="home-content">
                    <div className="content-title">Trung tâm tổ chức sự kiện nổi bật</div>
                    <div className="content-restaurant">
                        <div className="section-1">
                            <div className="content-restaurant-heading">
                                <div className="heading-title">Tiệc lưu động</div>
                                <div className="heading-see-all">Xem tất cả</div>
                            </div>
                            <Container className="content-restaurant-list">
                                <Row className="content-restaurant-row">
                                    <Carousel
                                        responsive={responsive}
                                        additionalTransfrom={0}
                                        autoPlay={this.props.deviceType !== "desktop" ? true : false}
                                        autoPlaySpeed={3000}
                                        centerMode={true}
                                        containerClass="container"
                                        focusOnSelect={false}
                                        infinite={true}
                                        slidesToSlide={1}
                                        containerClass="container-with-dots"
                                    >
                                        {restaurantsType1.map(restaurant => {
                                            return <Card key={restaurant.restaurantId} className="item">
                                                <CardImg className="restaurant-img" top width="100%" src={'/images/' + restaurant.imageId} alt="Nhà hàng" />
                                                <CardBody className="restaurant-content">
                                                    <CardTitle tag="h5">{restaurant.restaurantName}</CardTitle>
                                                    <CardSubtitle className="restaurant-location" tag="h6" className="mb-2 text-muted">{restaurant.province}</CardSubtitle>
                                                    <CardText className="restaurant-size">{'Khoảng ' + restaurant.size + ' người'}</CardText>
                                                    <StarRatings
                                                        rating={restaurant.rate}
                                                        starDimension="20px"
                                                        starSpacing="4px"
                                                        starRatedColor="#ffe200"
                                                        numberOfStars={5}
                                                        className="rating-star"
                                                    />
                                                    <Link to={"/restaurant-detail/" + restaurant.restaurantId} className="btn btn-success">Xem thêm</Link>
                                                </CardBody>
                                            </Card>
                                        })}
                                    </Carousel>
                                </Row>
                            </Container>
                        </div>
                        <div className="section-2">
                            <div className="content-restaurant-heading">
                                <div className="heading-title">Tiệc tại trung tâm</div>
                                <div className="heading-see-all">Xem tất cả</div>
                            </div>
                            <Container className="content-restaurant-list">
                                <Row className="content-restaurant-row">
                                    <Carousel
                                        responsive={responsive}
                                        additionalTransfrom={0}
                                        autoPlay={this.props.deviceType !== "desktop" ? true : false}
                                        autoPlaySpeed={3000}
                                        centerMode={true}
                                        containerClass="container"
                                        focusOnSelect={false}
                                        infinite={true}
                                        slidesToSlide={1}
                                        containerClass="container-with-dots"
                                    >
                                        {restaurantsType2.map(restaurant => {
                                            return <Card key={restaurant.restaurantId} className="item">
                                                <CardImg className="restaurant-img" top width="100%" src={'/images/' + restaurant.imageId} alt="Nhà hàng" />
                                                <CardBody className="restaurant-content">
                                                    <CardTitle tag="h5">{restaurant.restaurantName}</CardTitle>
                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{restaurant.province}</CardSubtitle>
                                                    <CardText className="restaurant-size">{'Khoảng ' + restaurant.size + ' người'}</CardText>
                                                    <StarRatings
                                                        rating={restaurant.rate}
                                                        starDimension="20px"
                                                        starSpacing="4px"
                                                        starRatedColor="#ffe200"
                                                        numberOfStars={5}
                                                        className="rating-star"
                                                    />
                                                    <Link to={"/restaurant-detail/" + restaurant.restaurantId} className="btn btn-success">Xem thêm</Link>
                                                </CardBody>
                                            </Card>
                                        })}
                                    </Carousel>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
                <Footer />
                {
                    isSubmit &&
                    <Redirect to={{
                        pathname: '/search-result'
                    }} />
                }
            </div>
        );
    }
}