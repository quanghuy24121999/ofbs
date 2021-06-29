import React, { useEffect, useState } from 'react';
import {
    Button, Modal, ModalHeader, Container,
    ModalBody, ModalFooter, Label, Input,
    CardImg, Alert, Row, Col, Table
} from 'reactstrap';
import { FaEdit, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ImageUploading from "react-images-uploading";
import ReactPaginate from 'react-paginate';

import DishComboItem from './dishComboItem';
import { formatCurrency } from '../common/formatCurrency';
import AddDishComboItem from './addDishComboItem';

export default function MyRestaurantComboItem(props) {
    const combo = props.combo;
    const restaurantId = props.restaurantId;
    let statusCombo = combo.status_name;
    let count = props.count;
    let priceDish = 0;

    if (statusCombo === 'active') {
        statusCombo = 'Đang kinh doanh';
    } else {
        statusCombo = 'Ngừng kinh doanh';
    }

    const [modal, setModal] = useState(false);
    const [modal1, setModa1] = useState(false);
    const [comboModal, setComboModal] = useState();
    const [dishesModal, setDishModal] = useState();
    const [name, setName] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [category, setCategory] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [imageId, setImageId] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceTempt, setPriceTempt] = useState(0);
    const [dishesPaging, setDishesPaging] = useState([]);

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [pageCount, setPageCount] = useState(0);

    const onChangeName = (e) => { setName(e.target.value) };
    const onChangeNameSearch = (e) => { setNameSearch(e.target.value) };
    const onChangeCategory = (e) => { setCategory(e.target.value) };
    const onChangePrice = (e) => { setPrice(e.target.value) };
    const onChangeDescription = (e) => { setDescription(e.target.value) };
    const onChangeStatus = (e) => { setStatus(e.target.value); };
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const toggle = () => {
        setImageId(combo.image_combo_id);
        setModal(!modal);

        if (modal === false) {
            axios.get(`/combos/getComboById?comboId=${combo.combo_id}`)
                .then(res => {
                    let combo = res.data;

                    setComboModal(res.data);
                    setName(combo.name);
                    setPrice(combo.price);
                    setDescription(combo.description);
                    setStatus(combo.status.id);
                })
            axios.get(`/dishes/getDishesByComboId?comboId=${combo.combo_id}`)
                .then(res => {
                    setDishModal(res.data);
                })
        }
    }

    useEffect(() => {
        axios.get(`/dishes/getCategories`)
            .then(res => {
                setCategories(res.data);
            })
    }, []);

    const toggle1 = () => {
        setModa1(!modal1);
        getDishes(0, '');
        if (modal1 === true) {
            axios.get(`/dishes/getDishesByComboId?comboId=${combo.combo_id}`)
                .then(res => {
                    setDishModal(res.data);
                })
        }
    }

    const getDishes = (categoryId, nameSearch) => {
        axios.get(`/dishes/getDishesByRestaurantId?restaurantId=${restaurantId}&categoryId=${categoryId}&dishName=${nameSearch}&statusId=1`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage);
                const dishes = slice.map((dish, index) => {
                    return <AddDishComboItem key={index} dish={dish} count={index + 1} combo={combo} dishModal={dishesModal} />
                });

                setPageCount(Math.ceil(data.length / perPage));
                setDishesPaging(dishes);
            })
    }

    useEffect(() => {
        axios.get(`/dishes/getDishesByComboId?comboId=${combo.combo_id}`)
            .then(res => {
                setDishModal(res.data);
            })
    }, [dishesModal]);

    useEffect(() => {
        getDishes(category, nameSearch);
    }, [currentPage]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
    };

    const searchDish = () => {
        setCurrentPage(0);
        setOffset(0);
        getDishes(category, nameSearch);
    }

    const updateImage = () => {
        let formData = new FormData();
        if (images.length > 0) {
            formData.append('file', images[0].file);
            document.getElementById('error-form4').style.display = "none";

            if (imageId === null || imageId === '') {
                axios.post(`/images/upload?userId=0&dishId=0&serviceId=0&comboId=${combo.combo_id}&restaurantId=0&promotionId=0&typeId=1`,
                    formData, {
                }).then(res => {
                    // window.location.reload();
                }).catch(err => {
                    document.getElementById('error-form4').style.display = "block";
                })
            } else {
                axios.post(`/images/update?imageId=${imageId}`,
                    formData, {
                }).then(res => {
                    // window.location.reload();
                }).catch(err => {
                    document.getElementById('error-form4').style.display = "block";
                })
            }
        }
    }

    const updateCombo = () => {
        axios.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let dishStatus = '';
                let restaurant = res.data;
                updateImage();

                if (status === 1) {
                    dishStatus = 'active';
                } else {
                    dishStatus = 'inactive';
                }

                axios.post(`/combos/save`,
                    {
                        "id": combo.combo_id,
                        "name": name,
                        "description": description,
                        "price": price,
                        "restaurant": restaurant,
                        "status": { id: status, name: dishStatus }
                    }
                )
                    .then(res => {
                        toggle();
                        window.location.reload();
                    })
            })
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{combo.combo_name}</td>
            <td>{formatCurrency(combo.combo_price)} VNĐ</td>
            <td>{statusCombo}</td>
            <td>
                <Button onClick={toggle} color="primary">
                    <FaEdit className="icon-edit" />Sửa
                </Button>
            </td>
            <Modal isOpen={modal} toggle={toggle} className={"custome-modal"}>
                <ModalHeader toggle={toggle}>Cập nhật combo</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            {
                                imageId && (
                                    <div>
                                        <ImageUploading
                                            value={images}
                                            onChange={onChange}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpdate,
                                                onImageRemove,
                                            }) => (
                                                <div className="upload__image-wrapper">
                                                    <CardImg id="user-image" className="dish-profile-image" top src={`/images/${imageId}`} alt="combo" />
                                                    {imageList.map((image, index) => (
                                                        (document.getElementById("user-image").style.display = "none"),
                                                        (
                                                            <div key={index} className="image-item">
                                                                <CardImg className="dish-profile-image" top src={image.data_url} />
                                                                <Alert color="danger" id="error-form4" className="error-form">
                                                                    Không thể tải ảnh lên, vui lòng chọn một ảnh khác !
                                                                </Alert>
                                                            </div>
                                                        )
                                                    )
                                                    )}

                                                    <div className="btn-change-image" onClick={onImageUpdate}>Thay đổi ảnh</div>
                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                )
                            }
                            {
                                comboModal && <div>
                                    <Label for="name"><b>Tên combo:</b></Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nhập tên combo"
                                        onChange={onChangeName}
                                        value={name}
                                    />

                                    <Label for="status"><b>Trạng thái:</b></Label>
                                    <Input
                                        type="select"
                                        name="status"
                                        id="status"
                                        onChange={onChangeStatus}
                                        value={status}
                                    >
                                        <option value="1">Đang hoạt động</option>
                                        <option value="2">Ngừng hoạt động</option>
                                    </Input>

                                    <Label for="price"><b>Giá combo:</b></Label>
                                    <Input
                                        type="number"
                                        name="price"
                                        id="price"
                                        placeholder="Nhập giá combo"
                                        onChange={onChangePrice}
                                        value={price}
                                    />

                                    <Label for="description"><b>Mô tả:</b></Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Mô tả combo"
                                        onChange={onChangeDescription}
                                        value={description}
                                    />
                                </div>
                            }
                        </Col>
                        <Col lg="6" md="6" sm="12">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên món</th>
                                        <th>Loại món ăn</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dishesModal && (
                                            dishesModal.map((dish, index) => {
                                                priceDish = priceDish + dish.price;
                                                return <DishComboItem key={index} dish={dish} combo={combo} count={index + 1} dishModal={dishesModal} />
                                            })
                                        )
                                    }
                                </tbody>
                            </Table>
                            
                            <Button color="primary" onClick={toggle1}>Thêm món ăn vào combo</Button>
                            <h5 className="price-tempt">{'Giá combo tạm tính: ' + formatCurrency(priceDish) + ' VNĐ'}</h5>
                            <Modal isOpen={modal1} toggle={toggle1} className="modal-add-dish-to-combo">
                                <ModalHeader toggle={toggle1}>Thêm món ăn vào combo</ModalHeader>
                                <ModalBody>
                                    <Row className="menu-search">
                                        <Col>
                                            <Row>
                                                <Col lg="5"><Label for="name"><b>Tên món ăn:</b></Label></Col>
                                                <Col lg="7">
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder="Nhập tên món ăn"
                                                        onChange={onChangeNameSearch}
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
                                                        onChange={onChangeCategory}
                                                        value={category}
                                                    >
                                                        <option value={0}>Tất cả</option>
                                                        {categories.map((category) => {
                                                            return (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="search-button-group">
                                            <Button onClick={searchDish} className="btn-service-search" color="primary">
                                                <FaSearch className="icon-search" />
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên món ăn</th>
                                                <th>Giá</th>
                                                <th>Loại món ăn</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dishesPaging.length > 0 && dishesPaging}
                                        </tbody>
                                    </Table>
                                    <Container>
                                        <ReactPaginate
                                            previousLabel={"Trang trước"}
                                            nextLabel={"Trang sau"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                        />
                                    </Container>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={toggle1}>Ok</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => updateCombo()}>Lưu</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </tr >
    )
}
