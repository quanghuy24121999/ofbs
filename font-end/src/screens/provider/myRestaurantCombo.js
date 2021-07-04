import React, { Component } from 'react';
import {
    Nav, NavItem, Container, Table,
    Label, Input, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Alert, CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { FaRegPlusSquare } from 'react-icons/fa';
import ImageUploading from "react-images-uploading";

import TopMenu from '../../components/common/topMenu';
import Footer from '../../components/common/footer';
import MyRestaurantMenuItem from '../../components/provider/myRestaurantComboItem';

let restaurantId = ''
export default class myRestaurantCombo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: [],
            categories: [],
            images: [],

            name: '',
            category: 1,
            price: '',
            description: '',
            modal: false,

            offset: 0,
            perPage: 10,
            currentPage: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        restaurantId = localStorage.getItem('resId');
        this.receivedData();
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangePrice(e) {
        this.setState({ price: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
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
        axios.get(`/combos/getCombosByRestaurantId?restaurantId=${restaurantId}&isActive=0`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const combosPaging = slice.map((combo, index) => {
                    return <MyRestaurantMenuItem key={index} combo={combo} count={index + 1} restaurantId={restaurantId} />
                })

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    combosPaging
                })
            });
    }

    toggle() { this.setState({ modal: !this.state.modal }) };

    onChange = (imageList, addUpdateIndex) => {
        this.setState({ images: imageList });
    }

    updateImage(comboId) {
        let formData = new FormData();
        formData.append('file', this.state.images[0].file);
        document.getElementById('error-form4').style.display = "none";

        axios.post(`/images/upload?userId=0&dishId=0&serviceId=0&comboId=${comboId}&restaurantId=0&promotionId=0&typeId=1`,
            formData, {
        }).then(res => {
            this.receivedData();
        }).catch(err => {
            document.getElementById('error-form4').style.display = "block";
        })
    }

    addCombo() {
        const { name, price, description } = this.state;
        axios.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let restaurant = res.data;

                axios.post(`/combos/save`,
                    {
                        "name": name,
                        "status": { id: 2, name: 'inactive' },
                        "description": description,
                        "price": price,
                        "restaurant": restaurant
                    }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                )
                    .then(res => {
                        this.toggle();
                        this.updateImage(res.data.id);
                    })
            })
    }

    render() {
        const { modal, images, name, price, description
        } = this.state;

        return (
            <div className="myRes-combo">
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem >
                        <Link to={`/users/profile/my-restaurant/detail`}>Thông tin</Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/image`
                            }}
                        >
                            Ảnh
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/menu`,
                                state: { restaurantId: localStorage.getItem('resId') }
                            }}
                        >
                            Thực đơn
                        </Link>
                    </NavItem>
                    <NavItem className="active">
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/combo`
                            }}
                        >
                            Combo món ăn
                        </Link>
                    </NavItem>
                    <NavItem >
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/service`
                            }}
                        >
                            Dịch vụ
                        </Link>
                    </NavItem>
                    <NavItem >
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/promotion`
                            }}
                        >
                            Khuyến mãi
                        </Link>
                    </NavItem>
                    <NavItem >
                        <Link
                            onClick={() => {
                                localStorage.setItem('resId', '');
                                localStorage.setItem('resId', restaurantId)
                            }}
                            to={{
                                pathname: `/users/profile/my-restaurant/order`
                            }}
                        >
                            Đơn hàng
                        </Link>
                    </NavItem>
                </Nav>
                <Container>
                    <h3>Combo</h3>
                    <hr />
                    <div className="btn-add-combo">
                        <Button color="primary" onClick={this.toggle}>
                            <FaRegPlusSquare className="icon-add-service" />Thêm combo
                        </Button>
                        <Modal isOpen={modal} toggle={this.toggle} className={``}>
                            <ModalHeader toggle={this.toggle}>Thêm combo</ModalHeader>
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
                                                            <CardImg className="business-image" top src={image.data_url} />
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
                                    <Label for="name"><b>Tên combo:</b></Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nhập tên combo"
                                        onChange={this.onChangeName}
                                        value={name}
                                    />

                                    <Label for="price"><b>Giá combo:</b></Label>
                                    <Input
                                        type="number"
                                        name="price"
                                        id="price"
                                        placeholder="Nhập giá combo"
                                        onChange={this.onChangePrice}
                                        value={price}
                                    />

                                    <Label for="description"><b>Mô tả:</b></Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Mô tả combo"
                                        onChange={this.onChangeDescription}
                                        value={description}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={() => this.addCombo()}>Lưu</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Trở lại</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên combo</th>
                                <th>Giá</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.combosPaging}
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