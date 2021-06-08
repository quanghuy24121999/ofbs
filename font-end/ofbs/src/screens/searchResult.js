import axios from 'axios';
import React, { Component } from 'react'
import {
    Container, Row, CardImg, Button, Card, CardTitle, CardText,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink, Col
} from 'reactstrap';

import StarRatings from "react-star-ratings";
import Paginations from "react-paginating";

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';


// const total = fruits.length * limit;

export default class searchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantSearch: [],
            currentPage: 1,
            limit: 2,
            pageCount: 3
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange = (page, e) => {
        this.setState({
            currentPage: page
        });
    };

    componentDidMount() {
        const { state } = this.props.location;
        let restaurant = state.searchResult;
        console.log(state.searchResult);

        axios.get(`http://localhost:8080/restaurants?type=${restaurant.type}&province=${restaurant.province}&district=${restaurant.district}&restaurantName=${restaurant.restaurantName}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    restaurantSearch: res.data
                })
            })
    }

    render() {
        const { restaurantSearch, currentPage, limit, pageCount } = this.state;

        return (
            <div>
                <TopMenu />
                <Container className="search-content">
                    <Row>
                        {restaurantSearch.map(restaurant => {
                            return <Col key={restaurant.restaurantId} className="item" lg="3" md="6" sm="12">
                                <Card>
                                    <CardImg top width="100%" src={'http://localhost:8080/images/' + restaurant.imageId} alt="Card image cap" />
                                    <CardBody>
                                        <CardTitle tag="h5">{restaurant.restaurantName}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">{restaurant.province}</CardSubtitle>
                                        <CardText>{'>' + restaurant.size + ' người'}</CardText>
                                        <StarRatings
                                            rating={restaurant.rate}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#ffe200"
                                            numberOfStars={5}
                                            className="rating-star"
                                        />
                                        <Button color="success">Xem thêm</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        })}
                    </Row>
                    <Paginations
                        total={restaurantSearch.length}
                        limit={limit}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        className="pagination"
                    >
                        {({
                            pages,
                            currentPage,
                            hasNextPage,
                            hasPreviousPage,
                            previousPage,
                            nextPage,
                            totalPages,
                            getPageItemProps
                        }) => (
                            <Pagination>
                                <PaginationItem>
                                    <PaginationLink
                                        {...getPageItemProps({
                                            pageValue: 1,
                                            onPageChange: this.handlePageChange,
                                            style: {
                                                background: "var(--color-primary)",
                                                color: "#ffffff",
                                                fontWeight: "500",
                                                borderRadius: "50%",
                                                width: "40px",
                                                height: "40px",
                                                paddingLeft: "9px",
                                                margin: "0 10px"
                                            }
                                        })}
                                    >
                                        {"<<"}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    {hasPreviousPage && (
                                        <PaginationLink
                                            {...getPageItemProps({
                                                pageValue: previousPage,
                                                onPageChange: this.handlePageChange
                                            })}
                                        >
                                            {"<"}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>

                                {pages.map((page) => {
                                    let activePage = null;
                                    if (currentPage === page) {
                                        activePage = { backgroundColor: "var(--color-primary)", color: "white" };
                                    }
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                {...getPageItemProps({
                                                    pageValue: page,
                                                    key: page,
                                                    style: activePage,
                                                    onPageChange: this.handlePageChange
                                                })}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                {hasNextPage && (
                                    <PaginationItem>
                                        <PaginationLink
                                            {...getPageItemProps({
                                                pageValue: nextPage,
                                                onPageChange: this.handlePageChange
                                            })}
                                        >
                                            {">"}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationLink className="pagination-last"
                                        {...getPageItemProps({
                                            pageValue: totalPages,
                                            onPageChange: this.handlePageChange,
                                            style: {
                                                background: "var(--color-primary)",
                                                color: "#ffffff",
                                                fontWeight: "500",
                                                borderRadius: "50%",
                                                width: "40px",
                                                height: "40px",
                                                paddingLeft: "9px",
                                                margin: "0 10px"
                                            }
                                        })}
                                    >
                                        {">>"}
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        )}
                    </Paginations>
                </Container>
                <Footer />
            </div>
        )
    }
}
