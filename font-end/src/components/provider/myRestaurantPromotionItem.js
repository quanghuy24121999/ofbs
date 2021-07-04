import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Label, Input,
    CardImg, Alert
} from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import ImageUploading from "react-images-uploading";

import { formatDate, formatDateForInput } from '../../common/formatDate';

export default function MyRestaurantPromotionItem(props) {
    const promotion = props.promotion;
    const restaurantId = props.restaurantId;
    let count = props.count;
    let statusPromotion = promotion.promotion_status;

    const [modal, setModal] = useState(false);
    const [promotionModal, setPromotionModal] = useState();

    const [name, setName] = useState('');
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [status, setStatus] = useState('');

    const [imageId, setImageId] = useState('');
    const [images, setImages] = useState([]);

    const onChangeName = (e) => { setName(e.target.value) };
    const onChangeDiscount = (e) => { setDiscount(e.target.value) };
    const onChangeStart = (e) => { setStart(e.target.value) };
    const onChangeEnd = (e) => { setEnd(e.target.value); };
    const onChangeStatus = (e) => { setStatus(e.target.value); };
    const onChangeDescription = (e) => { setDescription(e.target.value) };
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    if (statusPromotion === 'active') {
        statusPromotion = 'Đang diễn ra';
    } else if (statusPromotion === 'inactive') {
        statusPromotion = 'Đã kết thúc';
    } else if (statusPromotion === 'coming') {
        statusPromotion = 'Sắp diễn ra';
    }

    const toggle = () => {
        setImageId(promotion.image_id);
        setModal(!modal);

        if (modal === false) {
            axios.get(`/promotions/getPromotionById?promotionId=${promotion.promotion_id}`)
                .then(res => {
                    let promotion = res.data;
                    let statusPromotion = promotion.status.name;

                    if (statusPromotion === 'active') {
                        statusPromotion = 'Đang diễn ra';
                    } else if (statusPromotion === 'inactive') {
                        statusPromotion = 'Đã kết thúc';
                    } else if (statusPromotion === 'coming') {
                        statusPromotion = 'Sắp diễn ra';
                    }

                    setPromotionModal(res.data);
                    setName(promotion.name);
                    setDiscount(promotion.discountPercentage);
                    setDescription(promotion.description);
                    setStart(formatDateForInput(promotion.startDate));
                    setEnd(formatDateForInput(promotion.endDate));
                    setStatus(statusPromotion);
                })
        }
    }

    const updatePromotion = () => {
        axios.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let restaurant = res.data;

                updateImage();

                axios.post(`/promotions/save`,
                    {
                        "id": promotion.promotion_id,
                        "name": name,
                        "restaurant": restaurant,
                        "description": description,
                        "discountPercentage": discount,
                        "startDate": start,
                        "endDate": end,
                        "status": { id: 1, name: "active" }
                    }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                )
                    .then(res => {
                        toggle();
                        window.location.reload();
                    })
            })
    }

    const updateImage = () => {
        let formData = new FormData();
        if (images.length > 0) {
            formData.append('file', images[0].file);
            document.getElementById('error-form4').style.display = "none";

            if (imageId === null || imageId === '') {
                axios.post(`/images/upload?userId=0&dishId=0&serviceId=0&comboId=0&restaurantId=0&promotionId=${promotion.promotion_id}&typeId=1`,
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

    return (
        <tr>
            <td>{count}</td>
            <td>{promotion.promotion_name}</td>
            <td>{formatDate(promotion.start_date)}</td>
            <td>{formatDate(promotion.end_date)}</td>
            <td>{statusPromotion}</td>
            <td>
                <Button color="primary" onClick={toggle}>
                    <FaEdit className="icon-edit" />Sửa
                </Button>
            </td>
            <Modal isOpen={modal} toggle={toggle} className={``}>
                <ModalHeader toggle={toggle}>Cập nhật khuyến mãi</ModalHeader>
                <ModalBody>
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
                                            <CardImg id="user-image" className="promotion-profile-image" top src={`/images/${imageId}`} alt="khuyến mãi" />
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
                        promotionModal && <div>
                            <Label for="name"><b>Tên khuyến mãi:</b></Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nhập tên khuyến mãi"
                                onChange={onChangeName}
                                value={name}
                            />

                            <Label for="discount"><b>Phần trăm khuyến mãi:</b></Label>
                            <Input
                                type="number"
                                name="discount"
                                id="discount"
                                placeholder="Nhập phần trăm khuyến mãi"
                                onChange={onChangeDiscount}
                                value={discount}
                            />

                            <Label for="start"><b>Ngày bắt đầu:</b></Label>
                            <Input
                                type="date"
                                name="start"
                                id="start"
                                placeholder="Nhập ngày bắt đầu"
                                onChange={onChangeStart}
                                value={start}
                            />

                            <Label for="end"><b>Ngày kết thúc:</b></Label>
                            <Input
                                type="date"
                                name="end"
                                id="end"
                                placeholder="Nhập ngày kết thúc"
                                onChange={onChangeEnd}
                                value={end}
                            />

                            <Label for="status"><b>Trạng thái:</b></Label>
                            <Input
                                type="text"
                                name="status"
                                id="status"
                                onChange={onChangeStatus}
                                disabled
                                value={status}
                            />

                            <Label for="description"><b>Mô tả:</b></Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                placeholder="Mô tả khuyến mãi"
                                onChange={onChangeDescription}
                                value={description}
                            />
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => updatePromotion()}>Lưu</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </tr>
    )
}
