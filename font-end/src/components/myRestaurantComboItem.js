import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Label, Input,
    CardImg, Alert, Row, Col, Table
} from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import ImageUploading from "react-images-uploading";

import DishComboItem from './dishComboItem';
import { formatCurrency } from '../common/formatCurrency';

export default function MyRestaurantComboItem(props) {
    const combo = props.combo;
    const restaurantId = props.restaurantId;
    let statusCombo = combo.status_name;
    let count = props.count;

    if (statusCombo === 'active') {
        statusCombo = 'Đang kinh doanh';
    } else {
        statusCombo = 'Ngừng kinh doanh';
    }

    const [modal, setModal] = useState(false);
    const [comboModal, setComboModal] = useState();
    const [dishesModal, setDishModal] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [imageId, setImageId] = useState('');
    const [images, setImages] = useState([]);

    const onChangeName = (e) => { setName(e.target.value) };
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
                                                return <DishComboItem dish={dish} count={index + 1} />
                                            })
                                        )
                                    }
                                </tbody>
                            </Table>
                            <Button color="primary">Thêm món ăn vào combo</Button>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => updateCombo()}>Lưu</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </tr>
    )
}
