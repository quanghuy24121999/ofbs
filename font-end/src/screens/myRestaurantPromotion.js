import React, { Component } from 'react';
import {
    Nav, NavItem, Container, Row, Col, Table,
    Label, Input, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Alert, CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageUploading from "react-images-uploading";
import { FaSearch, FaRegPlusSquare } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';
import MyRestaurantPromotionItem from '../components/myRestaurantPromotionItem';

export default class myRestaurantPromotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: [],
            categories: [],
            images: [],
            nameSearch: '',
            categorySearch: 0,

            name: '',
            category: 1,
            status: 1,
            price: '',
            description: '',
            modal: false,

            offset: 0,
            perPage: 10,
            currentPage: 0
        }

        // this.onChangeNameSearch = this.onChangeNameSearch.bind(this);
        // this.onChangeCategorySearch = this.onChangeCategorySearch.bind(this);
        // this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeCategory = this.onChangeCategory.bind(this);
        // this.onChangePrice = this.onChangePrice.bind(this);
        // this.onChangeStatus = this.onChangeStatus.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.search = this.search.bind(this);
        // this.addDish = this.addDish.bind(this);
        // this.toggle = this.toggle.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.receivedData();
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: 0,
            offset: offset
        }, () => {
            this.receivedData();
        });

    };

    receivedData() {
        const restaurantId = this.props.match.params.restaurantId;
        axios.get(`/promotions/getPromotionsByRestaurantId?restaurantId=${restaurantId}&isActive=0`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const promotionsPaging = slice.map((promotion, index) => {
                    return <MyRestaurantPromotionItem key={index} promotion={promotion} count={index + 1} restaurantId={restaurantId} />
                })

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    promotionsPaging
                })
            });
    }

    render() {
        const restaurantId = this.props.match.params.restaurantId;
        const userId = this.props.match.params.userId;
        const { categorySearch, nameSearch, categories, modal,
            images, category, name, price, status, description
        } = this.state;

        return (
            <div className="myRes-promotion">
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem>
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/detail`}>Thông tin</Link>
                    </NavItem>
                    <NavItem >
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/image`}>Ảnh</Link>
                    </NavItem>
                    <NavItem >
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/menu`}>Thực đơn</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/combo`}>Combo món ăn</Link>
                    </NavItem>
                    <NavItem >
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/service`}>Dịch vụ</Link>
                    </NavItem>
                    <NavItem className="active">
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/promotion`}>Khuyến mãi</Link>
                    </NavItem>
                </Nav>
                <Container>
                    <h3>Khuyến mãi</h3>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên khuyến mãi</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.promotionsPaging}
                        </tbody>
                    </Table>
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
