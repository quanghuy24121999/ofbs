import axios from 'axios';
import React, { Component } from 'react'
import {
    Container, Row, CardImg, Button, Card, CardTitle, CardText,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink, Col
} from 'reactstrap';

import StarRatings from "react-star-ratings";
import ReactPaginate from 'react-paginate';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';

export default class searchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantSearch: [],
            offset: 0,
            perPage: 12,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
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

    receivedData() {
        const { state } = this.props.location;
        let restaurant = state.searchResult;
        axios.get(`http://localhost:8080/restaurants?type=${restaurant.type}&province=${restaurant.province}&district=${restaurant.district}&restaurantName=${restaurant.restaurantName}`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const restaurants = slice.map((restaurant) => {
                    return <Col key={restaurant.restaurantId} className="search-item" lg="3" md="6" sm="12">
                        <Card key={restaurant.restaurantId} className="item">
                            <CardImg className="restaurant-img" top width="100%" src={'http://localhost:8080/images/' + restaurant.imageId} alt="Nhà hàng" />
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
                                <Button color="success">Xem thêm</Button>
                            </CardBody>
                        </Card>
                    </Col>
                })

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    restaurants
                })
            });
    }

    componentDidMount() {
        const { state } = this.props.location;
        let restaurant = state.searchResult;
        console.log(state.searchResult);

        this.receivedData();
        this.setState({
            restaurantSearch: restaurant
        })
    }

    render() {
        return (
            <div>
                <TopMenu />
                <Container className="search-content">
                    <Row>
                        {this.state.restaurants}
                    </Row>
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
                </Container>
                <Footer />
            </div>
        )
    }
}
