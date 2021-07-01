import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter, NavItem, Nav, Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function RestaurantPendingItem(props) {
    const restaurant = props.restaurant;
    const count = props.count;

    const [modal, setModal] = useState(false);

    const toggle = () => {

        setModal(!modal);
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{restaurant.restaurant_name}</td>
            <td>{restaurant.restaurant_type}</td>
            <td>{restaurant.province}</td>
            <td>{'Khoảng: ' + restaurant.size + ' người'}</td>
            <td>
                <Link to={{
                    pathname: `/admin/restaurant/detail`,
                    state: {
                        restaurantId: restaurant.restaurant_id
                    }
                }}
                    className="btn btn-primary"
                >
                    <FaEye className="icon-see-more" />Chi tiết
                </Link>
                <Modal isOpen={modal} toggle={toggle} className={`modal-restaurant-detail`}>
                    <ModalHeader toggle={toggle}>Chi tiết nhà hàng</ModalHeader>
                    <ModalBody>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Trở lại</Button>
                    </ModalFooter>
                </Modal>
            </td>
            <td>
                <Button color="success">
                    Duyệt
                </Button>
            </td>
            <td>
                <Button color="danger">
                    Hủy
                </Button>
            </td>
        </tr>
    )
}
