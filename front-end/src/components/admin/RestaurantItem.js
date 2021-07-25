import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { api } from '../../config/axios';

export default function RestaurantItem(props) {
    const restaurant = props.restaurant;
    const count = props.count;
    const isPending = props.isPending;
    let currentPage = props.currentPage;
    const status = restaurant.restaurant_status;

    let restaurantStatus = restaurant.restaurant_status;

    if (restaurantStatus === 'active') {
        restaurantStatus = <div style={{ fontWeight: '500', color: 'green' }}>Đang hoạt động</div>;
    } else if (restaurantStatus === 'inactive') {
        restaurantStatus = <div style={{ fontWeight: '500', color: 'red' }}>Ngừng hoạt động</div>;
    } else if (restaurantStatus === 'banned') {
        restaurantStatus = <div style={{ fontWeight: '500', color: 'black' }}>Đã bị chặn</div>;
    } else if (restaurantStatus === 'pending') {
        restaurantStatus = <div style={{ fontWeight: '500', color: 'purple' }}>Đang chờ duyệt</div>;
    } else if (restaurantStatus === 'cancelled') {
        restaurantStatus = <div style={{ fontWeight: '500', color: 'black' }}>Không được duyệt</div>;
    }

    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const toggle1 = () => {
        setModal1(!modal1);
    }

    const toggle2 = () => {
        setModal2(!modal2);
    }

    const toggle3 = () => {
        setModal3(!modal3);
    }

    const banRestaurant = () => {
        api({
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: `/restaurants/updateStatus?restaurantId=${restaurant.restaurant_id}&status=${restaurant.restaurant_status}&statusUpdate=banned`
        }).then(res => {
            api.get(`/restaurants/getProviderPhoneLogin?restaurantId=${restaurant.restaurant_id}`)
                .then(res => {
                    api.get(`/users/findByPhoneNumber/${res.data}`)
                        .then(res => {
                            api.post(`/notifications/insertNotification`,
                                {
                                    "content": `Nhà hàng ${restaurant.restaurant_name} của bạn đã bị chặn, 
                                                vui lòng liên hệ admin qua messenger để biết thêm thông tin`,
                                    "customer": null,
                                    "provider": res.data,
                                    "forAdmin": false,
                                    "type": "restaurant",
                                    "read": false
                                }
                            )
                                .then(res => {
                                    toggle2();
                                    props.receivedData();
                                })
                        })
                })
        })
    }

    const unbanRestaurant = () => {
        api({
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: `/restaurants/updateStatus?restaurantId=${restaurant.restaurant_id}&status=${restaurant.restaurant_status}&statusUpdate=active`
        }).then(res => {
            api.get(`/restaurants/getProviderPhoneLogin?restaurantId=${restaurant.restaurant_id}`)
                .then(res => {
                    api.get(`/users/findByPhoneNumber/${res.data}`)
                        .then(res => {
                            api.post(`/notifications/insertNotification`,
                                {
                                    "content": `Nhà hàng ${restaurant.restaurant_name} của bạn được hoạt động lại`,
                                    "customer": null,
                                    "provider": res.data,
                                    "forAdmin": false,
                                    "type": "restaurant",
                                    "read": false
                                }
                            )
                                .then(res => {
                                    toggle3();
                                    props.receivedData();
                                })
                        })
                })
        })
    }

    const acceptRestaurant = () => {
        api({
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: `/restaurants/updateStatus?restaurantId=${restaurant.restaurant_id}&status=${restaurant.restaurant_status}&statusUpdate=active`
        }).then(res => {
            api.get(`/restaurants/getProviderPhoneLogin?restaurantId=${restaurant.restaurant_id}`)
                .then(res => {
                    api.get(`/users/findByPhoneNumber/${res.data}`)
                        .then(res => {
                            api.post(`/notifications/insertNotification`,
                                {
                                    "content": `Nhà hàng ${restaurant.restaurant_name} của bạn đã được duyệt`,
                                    "customer": null,
                                    "provider": res.data,
                                    "forAdmin": false,
                                    "type": "restaurant",
                                    "read": false
                                }
                            )
                                .then(res => {
                                    toggle();
                                    props.getData();
                                })
                        })
                })
        })
    }

    const denyRestaurant = () => {
        api({
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: `/restaurants/updateStatus?restaurantId=${restaurant.restaurant_id}&status=${restaurant.restaurant_status}&statusUpdate=cancelled`
        }).then(res => {
            api.get(`/restaurants/getProviderPhoneLogin?restaurantId=${restaurant.restaurant_id}`)
                .then(res => {
                    api.get(`/users/findByPhoneNumber/${res.data}`)
                        .then(res => {
                            api.post(`/notifications/insertNotification`,
                                {
                                    "content": `Nhà hàng ${restaurant.restaurant_name} của bạn không được duyệt`,
                                    "customer": null,
                                    "provider": res.data,
                                    "forAdmin": false,
                                    "type": "restaurant",
                                    "read": false
                                }
                            )
                                .then(res => {
                                    toggle1();
                                    props.getData();
                                })
                        })
                })
        })
    }

    return (
        <tr>
            <td>
                {
                    (currentPage === 0 ? count : count + 10 * currentPage)
                }
            </td>
            <td>{restaurant.restaurant_name}</td>
            <td>{restaurant.restaurant_type}</td>
            <td>{restaurant.province}</td>
            <td>{'Khoảng: ' + restaurant.size + ' người'}</td>
            {
                !isPending && (
                    <td>{restaurantStatus}</td>
                )
            }
            <td>
                <Link to={{
                    pathname: `/admin/restaurant/detail`,
                    state: {
                        restaurantId: restaurant.restaurant_id
                    }
                }}
                    className="btn btn-primary"
                >
                    Chi tiết
                </Link>
            </td>
            {
                !isPending && status === 'active' && <td>
                    <Button color="danger" onClick={toggle2}>
                        Chặn
                    </Button>
                    <Modal isOpen={modal2} toggle={toggle2} className={``}>
                        <ModalHeader toggle={toggle2}>Thông báo</ModalHeader>
                        <ModalBody>
                            Lưu thay đổi ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => banRestaurant()}>
                                Có
                            </Button>
                            <Button color="secondary" onClick={toggle2}>Trở lại</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            }
            {
                !isPending && status === 'banned' && <td>
                    <Button color="danger" onClick={toggle3}>
                        Bỏ chặn
                    </Button>
                    <Modal isOpen={modal3} toggle={toggle3} className={``}>
                        <ModalHeader toggle={toggle3}>Thông báo</ModalHeader>
                        <ModalBody>
                            Lưu thay đổi ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => unbanRestaurant()}>
                                Có
                            </Button>
                            <Button color="secondary" onClick={toggle3}>Trở lại</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            }
            {
                isPending && <td>
                    <Button color="success" onClick={toggle}>
                        Duyệt
                    </Button>
                    <Modal isOpen={modal} toggle={toggle} className={``}>
                        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                        <ModalBody>
                            Lưu thay đổi ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => acceptRestaurant()}>
                                Có
                            </Button>
                            <Button color="secondary" onClick={toggle}>Trở lại</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            }
            {
                isPending && <td>
                    <Button color="danger" onClick={toggle1}>
                        Hủy
                    </Button>
                    <Modal isOpen={modal1} toggle={toggle1} className={``}>
                        <ModalHeader toggle={toggle1}>Thông báo</ModalHeader>
                        <ModalBody>
                            Lưu thay đổi ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={() => denyRestaurant()}>
                                Có
                            </Button>
                            <Button color="secondary" onClick={toggle1}>Trở lại</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            }
        </tr>
    )
}
