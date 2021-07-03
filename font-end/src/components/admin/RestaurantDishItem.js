import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, CardImg
} from 'reactstrap';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function RestaurantDishItem(props) {
    const dish = props.dish;
    let statusDish = dish.status_name;
    let count = props.count;

    if (statusDish === 'active') {
        statusDish = 'Đang kinh doanh';
    } else {
        statusDish = 'Ngừng kinh doanh';
    }

    const [modal, setModal] = useState(false);
    const [dishModal, setDishModal] = useState();
    const [imageId, setImageId] = useState('');

    const toggle = () => {
        setImageId(dish.image_dish_id);
        setModal(!modal);

        if (modal === false) {
            axios.get(`/dishes/getDishesById?dishId=${dish.id}`)
                .then(res => {
                    setDishModal(res.data);
                })
        }
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{dish.dish_name}</td>
            <td>{dish.price}</td>
            <td>{dish.category_name}</td>
            <td>{statusDish}</td>
            <td>
                <Button onClick={toggle} color="primary">
                    <FaEye className="icon-see-more" />Xem thêm
                </Button>
            </td>
            <Modal isOpen={modal} toggle={toggle} className={``}>
                <ModalHeader toggle={toggle}>Chi tiết món ăn</ModalHeader>
                <ModalBody>
                    {
                        imageId && (
                            <CardImg id="user-image" className="dish-profile-image" top src={`/images/${imageId}`} alt="món ăn" />
                        )
                    }
                    {
                        dishModal && <div className="info">
                            <div>
                                <b>Tên món ăn:</b>{' ' + dishModal.name}
                            </div>

                            <div>
                                <b>Loại hình:</b>{' ' + dishModal.menuCategory.name}
                            </div>

                            <div>
                                <b>Trạng thái:</b>{' ' + statusDish}
                            </div>

                            <div>
                                <b>Giá món ăn:</b>{' ' + dishModal.price}
                            </div>

                            <div>
                                <b>Mô tả:</b>{' ' + dishModal.description}
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
