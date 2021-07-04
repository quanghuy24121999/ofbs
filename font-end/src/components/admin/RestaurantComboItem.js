import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter,
    CardImg, Row, Col, Table
} from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

import DishComboItem from '../restaurant/dishComboItem';

export default function RestaurantComboItem(props) {
    const combo = props.combo;
    let comboStatus = combo.status_name;
    let count = props.count;

    if (comboStatus === 'active') {
        comboStatus = 'Đang kinh doanh';
    } else {
        comboStatus = 'Ngừng kinh doanh';
    }

    const [modal, setModal] = useState(false);
    const [comboModal, setComboModal] = useState();
    const [dishModal, setDishModal] = useState();
    const [imageId, setImageId] = useState('');

    const toggle = () => {
        setImageId(combo.image_combo_id);
        setModal(!modal);

        if (modal === false) {
            axios.get(`/combos/getComboById?comboId=${combo.combo_id}`)
                .then(res => {
                    setComboModal(res.data);
                    console.log(res.data);
                });

            axios.get(`/dishes/getDishesByComboId?comboId=${combo.combo_id}`)
                .then(res => {
                    setDishModal(res.data);
                });
        }
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{combo.combo_name}</td>
            <td>{combo.combo_price}</td>
            <td>{comboStatus}</td>
            <td>
                <Button onClick={toggle} color="primary">
                    <FaEye className="icon-see-more" />Xem thêm
                </Button>
            </td>
            <Modal isOpen={modal} toggle={toggle} className={`admin-modal-combo`}>
                <ModalHeader toggle={toggle}>Chi tiết Combo</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            {
                                imageId && (
                                    <CardImg id="user-image" className="dish-profile-image" top src={`/images/${imageId}`} alt="dịch vụ" />
                                )
                            }
                            {
                                comboModal && <div className="info">
                                    <div>
                                        <b>Tên combo:</b>{' ' + comboModal.name}
                                    </div>

                                    <div>
                                        <b>Trạng thái:</b>{' ' + comboStatus}
                                    </div>

                                    <div>
                                        <b>Giá combo:</b>{' ' + comboModal.price}
                                    </div>

                                    <div>
                                        <b>Mô tả:</b>{' ' + comboModal.description}
                                    </div>
                                </div>
                            }
                        </Col>
                        <Col lg="6" md="6" sm="12">
                            <h5 className="title-dish-combo">Các món ăn trong combo</h5>
                            <hr />
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
                                        dishModal && (
                                            dishModal.map((dish, index) => {
                                                return <DishComboItem key={index} dish={dish} combo={combo} count={index + 1} />
                                            })
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </tr>
    )
}
