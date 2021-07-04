import React, { Component } from 'react';
import axios from 'axios';
import {
    Nav, NavItem, Container, Row, Col,
    Label, Input, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Alert, CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ImageUploading from "react-images-uploading";
import { FaSearch, FaRegPlusSquare } from 'react-icons/fa';

import TopMenu from '../../components/common/topMenu';
import Footer from '../../components/common/footer';
import MyRestaurantServiceItem from '../../components/provider/myRestaurantServiceItem';

let restaurantId = '';

export default class myRestaurantService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [],
            categories: [],
            images: [],
            nameSearch: '',
            name: '',
            category: 1,
            description: '',
            status: 1,
            price: '',
            categorySearch: '',
            modal: false
        }

        this.onChangeNameSearch = this.onChangeNameSearch.bind(this);
        this.onChangeCategorySearch = this.onChangeCategorySearch.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.search = this.search.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    componentDidMount() {
        restaurantId = localStorage.getItem('resId');
        axios.get(`/services/search?restaurantId=${restaurantId}`)
            .then(res => {
                this.setState({ services: res.data });
            })

        axios.get(`/services/getServiceCategories`)
            .then(res => {
                this.setState({ categories: res.data });
            })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeCategory(e) {
        this.setState({ category: e.target.value });
    }

    onChangeStatus(e) {
        this.setState({ status: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    onChangePrice(e) {
        this.setState({ price: e.target.value });
    }

    onChangeNameSearch(e) {
        this.setState({ nameSearch: e.target.value });
    }

    onChangeCategorySearch(e) {
        this.setState({ categorySearch: e.target.value });
    }

    search() {
        const { nameSearch, categorySearch } = this.state;
        axios.get(`/services/search?restaurantId=${restaurantId}&serviceName=${nameSearch}&category=${categorySearch}`)
            .then(res => {
                this.setState({ services: res.data });
            })
    }

    addService() {
        const { category, description, name, price, status } = this.state;
        console.log(status);
        axios.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let serviceStatus = '';
                let serviceCategory = '';
                let restaurant = res.data;

                if (status === 1) {
                    serviceStatus = 'active';
                } else {
                    serviceStatus = 'inactive';
                }

                switch (category) {
                    case 1:
                        serviceCategory = 'Trang trí';
                        break;

                    case 2:
                        serviceCategory = 'Ban nhạc';
                        break;

                    case 3:
                        serviceCategory = 'Vũ đoàn';
                        break;

                    case 4:
                        serviceCategory = 'Ca sĩ';
                        break;

                    case 5:
                        serviceCategory = 'MC';
                        break;

                    case 6:
                        serviceCategory = 'Quay phim - chụp ảnh';
                        break;

                    case 7:
                        serviceCategory = 'Xe cưới';
                        break;

                    default:
                        break;
                }

                axios.post(`/services/update`,
                    {
                        "name": name,
                        "description": description,
                        "status": { id: status, name: serviceStatus },
                        "price": price,
                        "restaurant": restaurant,
                        "serviceCategory": { id: category, name: serviceCategory }
                    }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                )
                    .then(res => {
                        this.toggle();
                        console.log(res.data)
                        this.updateImage(res.data.id);
                    })
            })
    }

    toggle() { this.setState({ modal: !this.state.modal }) };

    onChange = (imageList, addUpdateIndex) => {
        this.setState({ images: imageList });
    }

    updateImage(serviceId) {
        let formData = new FormData();
        formData.append('file', this.state.images[0].file);
        document.getElementById('error-form4').style.display = "none";

        axios.post(`/images/upload?userId=0&dishId=0&serviceId=${serviceId}&comboId=0&restaurantId=0&promotionId=0&typeId=1`,
            formData, {
        }).then(res => {
            window.location.reload();
        }).catch(err => {
            document.getElementById('error-form4').style.display = "block";
        })
    }

    render() {
        const { services, categorySearch, nameSearch, categories, modal,
            images, category, description, name, price, status
        } = this.state;

        return (
            <div className="myRes-service">
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
                    <NavItem>
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
                    <NavItem className="active">
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
                    <h3>Dịch vụ</h3>
                    <hr />
                    <Row className="service-search">
                        <Col>
                            <Row>
                                <Col lg="5"><Label for="name"><b>Tên dịch vụ:</b></Label></Col>
                                <Col lg="7">
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nhập tên dịch vụ"
                                        onChange={this.onChangeNameSearch}
                                        value={nameSearch}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <Col lg="4"><Label for="categorySearch"><b>Loại hình:</b></Label></Col>
                                <Col lg="8">
                                    <Input
                                        type="select"
                                        name="categorySearch"
                                        id="categorySearch"
                                        onChange={this.onChangeCategorySearch}
                                        value={categorySearch}
                                    >
                                        <option value=''>Tất cả</option>
                                        {categories.map((category) => {
                                            return (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="search-button-group">
                            <Button onClick={this.search} className="btn-service-search" color="success">
                                <FaSearch className="icon-search" />
                            </Button>
                            <Button color="primary" onClick={this.toggle}>
                                <FaRegPlusSquare className="icon-add-service" />Thêm dịch vụ
                            </Button>
                            <Modal isOpen={modal} toggle={this.toggle} className={``}>
                                <ModalHeader toggle={this.toggle}>Thêm dịch vụ</ModalHeader>
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
                                        <Label for="name"><b>Tên dịch vụ:</b></Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Nhập tên dịch vụ"
                                            onChange={this.onChangeName}
                                            value={name}
                                        />

                                        <Label for="category"><b>Loại hình:</b></Label>
                                        <Input
                                            type="select"
                                            name="category"
                                            id="category"
                                            onChange={this.onChangeCategory}
                                            value={category}
                                        >
                                            {categories.map((category) => {
                                                return (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                );
                                            })}
                                        </Input>

                                        <Label for="status"><b>Trạng thái:</b></Label>
                                        <Input
                                            type="select"
                                            name="status"
                                            id="status"
                                            onChange={this.onChangeStatus}
                                            value={status}
                                        >
                                            <option value="1">Đang hoạt động</option>
                                            <option value="2">Ngừng hoạt động</option>
                                        </Input>

                                        <Label for="price"><b>Giá dịch vụ:</b></Label>
                                        <Input
                                            type="number"
                                            name="price"
                                            id="price"
                                            placeholder="Nhập giá dịch vụ"
                                            onChange={this.onChangePrice}
                                            value={price}
                                        />

                                        <Label for="description"><b>Mô tả:</b></Label>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            id="description"
                                            placeholder="Mô tả dịch vụ"
                                            onChange={this.onChangeDescription}
                                            value={description}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={() => this.addService()}>Lưu</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Trở lại</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                    {
                        services.length > 0 &&
                        <MyRestaurantServiceItem services={services} restaurantId={restaurantId} />
                    }
                </Container>
                <Footer />
            </div>
        )
    }
}
