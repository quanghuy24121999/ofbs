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
            images: [],

            name: '',
            discount: 0,
            status: 1,
            start: '',
            end: '',
            description: '',
            modal: false,

            offset: 0,
            perPage: 10,
            currentPage: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.onChange = this.onChange.bind(this);
        this.addPromotion = this.addPromotion.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.receivedData();
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeDiscount(e) {
        this.setState({ discount: e.target.value });
    }

    onChangeStatus(e) {
        this.setState({ status: e.target.value });
    }

    onChangeStart(e) {
        this.setState({ start: e.target.value });
    }

    onChangeEnd(e) {
        this.setState({ end: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    toggle() { this.setState({ modal: !this.state.modal }) };

    onChange = (imageList, addUpdateIndex) => {
        this.setState({ images: imageList });
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

    addPromotion() {
        const restaurantId = this.props.match.params.restaurantId;
        const { discount, name, status, description, start, end } = this.state;
        axios.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let restaurant = res.data;

                axios.post(`/promotions/save`,
                    {
                        "name": name,
                        "restaurant": restaurant,
                        "description": description,
                        "discountPercentage": discount,
                        "startDate": start,
                        "endDate": end,
                        "status": { id: 1, name: 'active' }
                    }
                )
                    .then(res => {
                        this.toggle();
                        this.updateImage(res.data.id);
                    })
            })
    }

    updateImage(promotionId) {
        let formData = new FormData();
        if (this.state.images.length > 0) {
            formData.append('file', this.state.images[0].file);
            document.getElementById('error-form4').style.display = "none";

            axios.post(`/images/upload?userId=0&dishId=0&serviceId=0&comboId=0&restaurantId=0&promotionId=${promotionId}&typeId=1`,
                formData, {
            }).then(res => {
                this.receivedData(0, '');
            }).catch(err => {
                document.getElementById('error-form4').style.display = "block";
            })
        }
    }

    render() {
        const restaurantId = this.props.match.params.restaurantId;
        const userId = this.props.match.params.userId;
        const { discount, modal, start, end,
            images, name, status, description
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
                        <Link to={`/users/profile/${userId}/my-restaurant/${restaurantId}/combo`}>Combo khuyến mãi</Link>
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
                    <div className="add-promotion">
                        <Button color="primary" onClick={this.toggle}>
                            <FaRegPlusSquare className="btn-add-promotion" />Thêm khuyến mãi
                        </Button>
                        <Modal isOpen={modal} toggle={this.toggle} className={``}>
                            <ModalHeader toggle={this.toggle}>Thêm khuyến mãi</ModalHeader>
                            <ModalBody>
                                <div>
                                    <ImageUploading
                                        value={images}
                                        onChange={this.onChange}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpdate,
                                            onImageRemove,
                                        }) => (
                                            <div className="upload__image-wrapper">
                                                {imageList.map((image, index) => (
                                                    (
                                                        <div key={index} className="image-item">
                                                            <CardImg className="promotion-image" top src={image.data_url} />
                                                            <Alert color="danger" id="error-form4" className="error-form">
                                                                Không thể tải ảnh lên, vui lòng chọn một ảnh khác !
                                                            </Alert>
                                                        </div>
                                                    )
                                                )
                                                )}

                                                <div className="btn-change-image" onClick={onImageUpdate}>Chọn hoặc đổi ảnh</div>
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                                <div>
                                    <Label for="name"><b>Tên khuyến mãi:</b></Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nhập tên khuyến mãi"
                                        onChange={this.onChangeName}
                                        value={name}
                                    />

                                    <Label for="discount"><b>Phần trăm khuyến mãi:</b></Label>
                                    <Input
                                        type="number"
                                        name="discount"
                                        id="discount"
                                        placeholder="Nhập phần trăm khuyến mãi"
                                        onChange={this.onChangeDiscount}
                                        value={discount}
                                    />

                                    <Label for="start"><b>Ngày bắt đầu:</b></Label>
                                    <Input
                                        type="date"
                                        name="start"
                                        id="start"
                                        placeholder="Nhập ngày bắt đầu"
                                        onChange={this.onChangeStart}
                                        value={start}
                                    />

                                    <Label for="end"><b>Ngày kết thúc:</b></Label>
                                    <Input
                                        type="date"
                                        name="end"
                                        id="end"
                                        placeholder="Nhập ngày kết thúc"
                                        onChange={this.onChangeEnd}
                                        value={end}
                                    />

                                    <Label for="description"><b>Mô tả:</b></Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Mô tả khuyến mãi"
                                        onChange={this.onChangeDescription}
                                        value={description}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={() => this.addPromotion()}>Lưu</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Trở lại</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
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
