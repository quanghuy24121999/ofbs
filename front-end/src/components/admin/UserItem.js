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
    let currentPage = props.currentPage;
    let role = user.role.name;
    let status = user.status.name;
    let image = '';

    const [usereDetail, setUserDetail] = useState('');
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const toggle = () => {
        setModal(!modal);

        if (!modal) {
            viewDetailUser(user.id);
        }
    }

    const toggle1 = () => {
        setModal1(!modal1);
    }

    const toggle2 = () => {
        setModal2(!modal2);
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
            <td>
                {
                    (currentPage === 0 ? count : count + 10 * currentPage)
                }
            </td>
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
                    <Button color="success" onClick={toggle1}>
                        Bỏ Chặn
                    </Button>
                    <Modal isOpen={modal1} toggle={toggle1} className={``}>
                        <ModalHeader toggle={toggle1}>Thông báo</ModalHeader>
                        <ModalBody>
                            Lưu thay đổi ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => unbanUser(user.id)}>
                                Có
                            </Button>
                            <Button color="secondary" onClick={toggle1}>Trở lại</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            }
            {
                user.status.name === 'active' && <td>
                    <Button color="danger" onClick={toggle2}>
                        Chặn
                    </Button>
                    <Modal isOpen={modal2} toggle={toggle2} className={``}>
                        <ModalHeader toggle={toggle2}>Thông báo</ModalHeader>
                        <ModalBody>
                            Lưu thay đổi ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => banUser(user.id)}>
                                Có
                            </Button>
                            <Button color="secondary" onClick={toggle2}>Trở lại</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            }
        </tr>
    )
}
