import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter,
    Row,
    Col,
    CardImg,
    Container
} from 'reactstrap';

import imageUser from '../../images/default-avatar-user.png';
import { api, url } from '../../config/axios';
import { formatDate } from '../../common/formatDate';

export default function UserItem(props) {
    const user = props.user;
    const count = props.count;
    let role = user.role.name;
    let status = user.status.name;
    let image = '';

    const [usereDetail, setUserDetail] = useState('');
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);

        if (!modal) {
            viewDetailUser(user.id);
        }
    }

    if (role === 'ROLE_PROVIDER') {
        role = 'Nhà cung cấp';
    } else if (role === 'ROLE_CUSTOMER') {
        role = 'Khách hàng';
    }

    if (status === 'active') {
        status = 'Hoạt động';
    } else if (status === 'inactive') {
        status = 'Ngừng hoạt động';
    } else if (status === 'banned') {
        status = 'Đã bị chặn';
    }

    if (usereDetail.image_id === '' || usereDetail.image_id === null) {
        image = <CardImg id="user-image" className="user-profile-image" top src={imageUser} />
    } else {
        image = <CardImg id="user-image" className="user-profile-image" top src={url + '/images/' + usereDetail.image_id} />
    }

    const viewDetailUser = (userId) => {
        api.get(`/users/profile/?userId=${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data)
                setUserDetail(res.data);
            })
    }

    const banUser = (userId) => {
        api({
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: `/users/updateUserStatus?userId=${userId}&status=banned`
        }).then(res => {
            props.receivedData();
        })
    }

    const unbanUser = (userId) => {
        api({
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: `/users/updateUserStatus?userId=${userId}&status=active`
        }).then(res => {
            props.receivedData();
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
                <Modal isOpen={modal} toggle={toggle} className={`admin-user-modal`}>
                    <ModalHeader toggle={toggle}>Chi tiết người dùng</ModalHeader>
                    <ModalBody>
                        <Container>
                            {
                                usereDetail !== '' && <Row className="admin-user-row">
                                    <Col lg="6" md="12" sm="12">
                                        {image}
                                    </Col>
                                    <Col lg="6" md="12" sm="12" className="admin-user-info">
                                        <div><span>Tên người dùng: </span>{usereDetail.user_name}</div>
                                        <div><span>Số điện thoại: </span>{usereDetail.phone_number}</div>
                                        <div><span>Ngày sinh: </span>{formatDate(usereDetail.date_of_birth)}</div>
                                        <div><span>Email: </span>{usereDetail.email}</div>
                                        <div><span>Địa chỉ: </span>{usereDetail.address}</div>
                                    </Col>
                                </Row>
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Quay lại</Button>
                    </ModalFooter>
                </Modal>
            </td>
            {
                user.status.name === 'banned' && <td>
                    <Button color="success" onClick={() => unbanUser(user.id)}>
                        Bỏ Chặn
                    </Button>
                </td>
            }
            {
                user.status.name === 'active' && <td>
                    <Button color="danger" onClick={() => banUser(user.id)}>
                        Chặn
                    </Button>
                </td>
            }
        </tr>
    )
}
