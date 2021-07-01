import React, { useEffect, useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars } from 'react-icons/fa';
import {
    Container, Table
} from 'reactstrap';
import axios from 'axios';

import RestaurantPendingItem from '../../components/admin/RestaurantPendingItem';

function Restaurant() {
    const [toggled, setToggled] = useState(false);
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get(`/restaurants/getRestaurantByProviderId?providerId=53&statusId=3`)
            .then(res => {
                setRestaurants(res.data);
            })
    })

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="restaurant"
            />

            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <div>Đăng xuất</div>
                </div>
                <Container>
                    <h3>Các nhà hàng đang chờ duyệt</h3>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên nhà hàng</th>
                                <th>Loại hình</th>
                                <th>Địa chỉ</th>
                                <th>Quy mô</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                restaurants.map((restaurant, index) => {
                                    return <RestaurantPendingItem key={index} restaurant={restaurant} count={index + 1} />
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}

export default Restaurant;