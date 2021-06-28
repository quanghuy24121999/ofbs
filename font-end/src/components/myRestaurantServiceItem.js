import axios from 'axios';
import React, { useState } from 'react';
import {
    Table, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Label, Input,
    CardImg, Alert
} from 'reactstrap';
import ImageUploading from "react-images-uploading";
import { FaEdit } from 'react-icons/fa';

import { formatCurrency } from '../common/formatCurrency';

export default function MyRestaurantServiceItem(props) {
    const services = props.services;
    const restaurantId = props.restaurantId;
    const userId = props.userId;
    let count = 1;

    const [modal, setModal] = useState(false);
    const [service, setService] = useState();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState('');
    const [imageId, setImageId] = useState('');
    const [images, setImages] = useState([]);

    axios.get(`/services/getServiceCategories`)
        .then(res => {
            setCategories(res.data);
        })

    const toggle = (serviceId, imageId) => {
        setImageId(imageId);
        setModal(!modal);

        if (modal === false) {
            axios.get(`/services/getServiceById?serviceId=${serviceId}`)
                .then(res => {
                    let service = res.data;

                    setService(res.data);
                    setName(service.name);
                    setPrice(service.price);
                    setDescription(service.description);
                    setCategory(service.serviceCategory.id);
                    setStatus(service.status.id);
                })
        }
    }

    const onChangeName = (e) => { setName(e.target.value) };
    const onChangePrice = (e) => { setPrice(e.target.value) };
    const onChangeDescription = (e) => { setDescription(e.target.value) };
    const onChangeCategory = (e) => { setCategory(e.target.value); };
    const onChangeStatus = (e) => { setStatus(e.target.value); };
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const updateImage = () => {
        let formData = new FormData();
        if (images.length > 0) {
            formData.append('file', images[0].file);
            document.getElementById('error-form4').style.display = "none";

            if (imageId === null || imageId === '') {
                axios.post(`/images/upload?userId=${userId}&dishId=0&serviceId=${service.id}&comboId=0&restaurantId=0&promotionId=0&typeId=1`,
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

    const updateService = (serviceId) => {
        axios.get(`/restaurants/getRestaurantById?restaurantId=${restaurantId}`)
            .then(res => {
                let serviceStatus = '';
                let serviceCategory = '';
                let restaurant = res.data;
                updateImage();

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
                        "id": serviceId,
                        "name": name,
                        "description": description,
                        "status": { id: status, name: serviceStatus },
                        "price": price,
                        "restaurant": restaurant,
                        "serviceCategory": { id: category, name: serviceCategory }
                    }
                )
                    .then(res => {
                        toggle();
                        window.location.reload();
                    })
            })
    }

    return (
        <div className="service-content">

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên dịch vụ</th>
                        <th>Giá</th>
                        <th>Loại dịch vụ</th>
                        <th>Trạng thái</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map((item, index) => {
                            if (item.id) {
                                let status = '';
                                if (item.status_name === "active") {
                                    status = 'Đang hoạt động';
                                } else {
                                    status = 'Ngừng hoạt động';
                                }
                                return (<tr key={index} className="od-dish-item">
                                    <th>{count++}</th>
                                    <td>{item.service_name}</td>
                                    <td>{formatCurrency(item.price)} VNĐ</td>
                                    <td>{item.service_category_name}</td>
                                    <td>{status}</td>
                                    <td><Button color="primary" onClick={() =>
                                        toggle(
                                            item.id,
                                            item.image_service_id
                                        )}
                                    >
                                        <FaEdit className="icon-edit"/>Sửa
                                    </Button></td>
                                </tr>
                                )
                            } else {
                                return <tr key={index}></tr>
                            }
                        })
                    }
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle} className={``}>
                <ModalHeader toggle={toggle}>Cập nhật dịch vụ</ModalHeader>
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
                                            <CardImg id="user-image" className="user-profile-image" top src={`/images/${imageId}`} alt="Dịch vụ" />
                                            {imageList.map((image, index) => (
                                                (document.getElementById("user-image").style.display = "none"),
                                                (
                                                    <div key={index} className="image-item">
                                                        <CardImg className="user-profile-image" top src={image.data_url} />
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
                        service && <div>
                            <Label for="name"><b>Tên dịch vụ:</b></Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nhập tên dịch vụ"
                                onChange={onChangeName}
                                value={name}
                            />

                            <Label for="category"><b>Loại hình:</b></Label>
                            <Input
                                type="select"
                                name="category"
                                id="category"
                                onChange={onChangeCategory}
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
                                onChange={onChangeStatus}
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
                                onChange={onChangePrice}
                                value={price}
                            />

                            <Label for="description"><b>Mô tả:</b></Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                placeholder="Mô tả dịch vụ"
                                onChange={onChangeDescription}
                                value={description}
                            />
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => updateService(service.id)}>Lưu</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
