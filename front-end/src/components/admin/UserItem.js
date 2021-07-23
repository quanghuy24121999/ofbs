import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter,
    Row,
    Col,
    CardImg
} from 'reactstrap';
import { api } from '../../config/axios';

export default function UserItem(props) {
    const user = props.user;
    const count = props.count;
    let role = user.role.name;
    let status = user.status.name;

    const [usereDetail, setUserDetail] = useState('');
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);

        if (!modal) {
            viewDetailUser(user.id);
        }
    }

    if (role === 'ROLE_PROVIDER') {
        role = 'Cung cấp';
    } else if (role === 'ROLE_CUSTOMER') {
        role = 'Khách hàng';
    }

    if (status === 'active') {
        status = 'Hoạt động';
    } else if (status === 'inactive') {
        status = 'Ngừng hoạt động';
    }

    const viewDetailUser = (userId) => {
        api.get(`/users/profile/?userId=${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data);
                setUserDetail(res.data);
            })
    }

    return (
        <tr>
            <td>{count}</td>
            <td>{user.name}</td>
            <td>{user.phoneNumber}</td>
            <td>{role}</td>
            <td>{status}</td>
            <td>
                <Button color="primary" onClick={toggle}>Chi tiết</Button>
                <Modal isOpen={modal} toggle={toggle} className={``}>
                    <ModalHeader toggle={toggle}>Chi tiết người dùng</ModalHeader>
                    <ModalBody>
                        {
                            usereDetail !== '' && <Row>
                                <Col>
                                    <CardImg />
                                </Col>
                            </Row>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Quay lại</Button>
                    </ModalFooter>
                </Modal>
            </td>
            <td>
                <Button color="danger">Chặn</Button>
            </td>
        </tr>
    )
}
