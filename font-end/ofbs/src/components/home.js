import { Component } from 'react';
import {
    CardImg, Row, Col, Form, FormGroup,
    Input, Label, Button, Card, CardTitle, CardText,
    CardSubtitle, CardBody, Container
} from 'reactstrap';

import axios from 'axios';
import subVn from "sub-vn";
import StarRatings from "react-star-ratings";
import Carousel from 'react-multi-carousel';

import TopMenu from './topMenu';
import Footer from './footer';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3,
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
            restaurantsType2: []
        };
        this.onProvinceClick = this.onProvinceClick.bind(this);
    }

    onProvinceClick(event) {
        event.preventDefault();
        let provinceCode = event.target.value;
        this.setState({
            districts: subVn.getDistrictsByProvinceCode(provinceCode)
        });
    }

    componentDidMount() {
        axios.get('http://localhost:8080/restaurants/1')
            .then(res => {
                this.setState({ restaurantsType1: res.data })
            })
        axios.get('http://localhost:8080/restaurants/2')
            .then(res => {
                this.setState({ restaurantsType2: res.data })
            })
    }

    render() {
        let { provinces, districts, restaurantsType1, restaurantsType2 } = this.state;

        return (
            <div className="home-container">
                <TopMenu />
                <div className="wallpaper">
                    <CardImg className="image" src={process.env.PUBLIC_URL + '/images/wallpaper.png'} alt="Logo" />
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
                            />
                        </FormGroup>
                        <div className="search-location">
                            <FormGroup className="citySelect">
                                <Label for="citySelect"><b>Chọn tỉnh/ thành phố:</b></Label>
                                <Input type="select" name="citySelect" id="citySelect" onChange={this.onProvinceClick}>
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
                                <Input type="select" name="districtSelect" id="districtSelect">
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
                            <Label><b>Chọn ngày:</b></Label>
                            <FormGroup>
                                <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="date placeholder"
                                />
                            </FormGroup>
                            <FormGroup className="search-other-cb1" check>
                                <Label check>
                                    <Input type="checkbox" /> Tiệc lưu động
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" /> Tiệc tại trung tâm
                            </Label>
                            </FormGroup>
                        </div>
                        <Input type="submit" className="btn btn-success btn-search" value="Tìm kiếm" />
                    </Form>

                </div>
                <div className="home-content">
                    <div className="content-title">Trung tâm tổ chức sự kiện nổi bật</div>
                    <div className="content-restaurant">
                        <div className="content-restaurant-heading">
                            <div className="heading-title">Tiệc lưu động</div>
                            <div className="heading-see-all">Xem tất cả</div>
                        </div>
                        <Container className="content-restaurant-list">
                            <Row className="content-restaurant-row">
                                <Carousel
                                    responsive={responsive}
                                    additionalTransfrom={0}
                                    autoPlaySpeed={3000}
                                    centerMode={true}
                                    containerClass="container"
                                    focusOnSelect={false}
                                    // infinite={true}
                                    slidesToSlide={1}
                                    containerClass="container-with-dots"
                                >
                                    {restaurantsType1.map(restaurant => {
                                        return <div key={restaurant.restaurantId} className="item">
                                            <Card>
                                                <CardImg top width="100%" src={'http://localhost:8080/images/' + restaurant.imageId} alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle tag="h5">{restaurant.restaurantName}</CardTitle>
                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{restaurant.province}</CardSubtitle>
                                                    <CardText>{'>' + restaurant.size + ' người'}</CardText>
                                                    <StarRatings
                                                        rating={restaurant.rate}
                                                        starDimension="40px"
                                                        starSpacing="15px"
                                                        starRatedColor="#ffe200"
                                                        numberOfStars={5}
                                                        starSpacing="4px"
                                                        starDimension='40px'
                                                        className="rating-star"
                                                    />
                                                    <Button color="success">Xem thêm</Button>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}