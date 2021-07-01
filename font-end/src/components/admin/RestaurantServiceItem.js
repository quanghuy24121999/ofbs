import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter,
    CardImg
} from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function RestaurantServiceItem(props) {
    const service = props.service;
    // console.log(service);
    let serviceDish = service.status_name;
    let count = props.count;

    if (serviceDish === 'active') {
        serviceDish = 'Đang kinh doanh';
    } else {
        serviceDish = 'Ngừng kinh doanh';
    }

    const [modal, setModal] = useState(false);
    const [serviceModal, setServiceModal] = useState();
    const [imageId, setImageId] = useState('');

    const toggle = () => {
        setImageId(service.image_service_id);
        setModal(!modal);

        if (modal === false) {
            axios.get(`/services/getServiceById?serviceId=${service.id}`)
                .then(res => {
                    setServiceModal(res.data);
                })
        }
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{service.service_name}</td>
            <td>{service.price}</td>
            <td>{service.service_category_name}</td>
            <td>{serviceDish}</td>
            <td>
                <Button onClick={toggle} color="primary">
                    <FaEye className="icon-see-more" />Xem thêm
                </Button>
            </td>
            <Modal isOpen={modal} toggle={toggle} className={``}>
                <ModalHeader toggle={toggle}>Chi tiết dịch vụ</ModalHeader>
                <ModalBody>
                    {
                        imageId && (
                            <CardImg id="user-image" className="dish-profile-image" top src={`/images/${imageId}`} alt="dịch vụ" />
                        )
                    }
                    {
                        serviceModal && <div className="info">
                            <div>
                                <b>Tên dịch vụ:</b>{' ' + serviceModal.name}
                            </div>

                            <div>
                                <b>Loại hình:</b>{' ' + serviceModal.serviceCategory.name}
                            </div>

                            <div>
                                <b>Trạng thái:</b>{' ' + serviceDish}
                            </div>

                            <div>
                                <b>Giá dịch vụ:</b>{' ' + serviceModal.price}
                            </div>

                            <div>
                                <b>Mô tả:</b>{' ' + serviceModal.description}
                            </div>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </tr>
    )
}
