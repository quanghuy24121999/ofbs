import React, { Component } from 'react';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import axios from 'axios'; import {
    Nav, NavItem, NavLink, Input, Label,
    Button, Container, Card, CardImg, CardBody,
    CardTitle, CardText, Row, Col
} from 'reactstrap';
import Carousel from 'react-multi-carousel';
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

export default class service extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceType1: [],
            serviceType2: [],
            serviceType3: [],
            serviceType4: [],
            serviceType5: [],
            serviceType6: [],
            serviceType7: []
        }
    }

    componentDidMount() {
        const restaurantId = this.props.match.params.restaurantId;
        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=1`)
            .then(res => {
                this.setState({ serviceType1: res.data })
            })

        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=2`)
            .then(res => {
                this.setState({ serviceType2: res.data })
            })

        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=3`)
            .then(res => {
                this.setState({ serviceType3: res.data })
            })

        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=4`)
            .then(res => {
                this.setState({ serviceType4: res.data })
            })
        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=5`)
            .then(res => {
                this.setState({ serviceType5: res.data })
            })

        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=6`)
            .then(res => {
                this.setState({ serviceType6: res.data })
            })

        axios.get(`/restaurants/services?restaurantId=${restaurantId}&categoryId=7`)
            .then(res => {
                this.setState({ serviceType7: res.data })
            })
    }

    render() {
        const { serviceType1, serviceType2, serviceType3, serviceType4,
            serviceType5, serviceType6, serviceType7
        } = this.state;
        const restaurantId = this.props.match.params.restaurantId;

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem>
                        <NavLink><Link to={`/restaurant-detail/${restaurantId}`}  >Nhà hàng</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to={`/restaurant-detail/${restaurantId}/menu`}  >Thực đơn</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active><Link >Dịch vụ</Link></NavLink>
                    </NavItem>
                </Nav>
                <div className="services">
                    <div className="list-services">
                        <Container className="list-dishes-title">Trang trí: </Container>
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
                                    {serviceType1.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >

                    <div className="list-services">
                        <Container className="list-dishes-title">Ban nhạc: </Container>
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
                                    {serviceType2.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >

                    <div className="list-services">
                        <Container className="list-dishes-title">Vũ đoàn: </Container>
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
                                    {serviceType3.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >

                    <div className="list-services">
                        <Container className="list-dishes-title">Ca sĩ: </Container>
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
                                    {serviceType4.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >

                    <div className="list-services">
                        <Container className="list-dishes-title">MC (Dẫn chương trình): </Container>
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
                                    {serviceType5.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >

                    <div className="list-services">
                        <Container className="list-dishes-title">Quay phim - chụp ảnh: </Container>
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
                                    {serviceType6.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >

                    <div className="list-services">
                        <Container className="list-dishes-title">Xe cưới: </Container>
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
                                    {serviceType7.map(service => {
                                        return <Card key={service.id} className="item">
                                            <CardImg className="service-img" top width="150px" height="200px" src={'/images/' + service.image_service_id} alt="Dịch vụ" />
                                            <CardBody className="service-content">
                                                <CardTitle tag="h5">{service.service_name}</CardTitle>
                                                <CardText className="service-price">{service.price + ' VNĐ'}</CardText>
                                            </CardBody>
                                        </Card>
                                    })}
                                </Carousel>
                            </Row>
                        </Container>
                    </div >
                </div>

                <Footer />
            </div>
        )
    }
}
