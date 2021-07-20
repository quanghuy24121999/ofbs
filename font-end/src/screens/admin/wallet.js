import React, { useEffect, useState } from 'react';
import {
    Container, Table
} from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import SlideBar from '../../components/admin/SlideBar';
import { api } from '../../config/axios';
import { Link } from 'react-router-dom';

import Notification from '../../components/admin/Notification';

export default function Wallet() {
    const [toggled, setToggled] = useState(false);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const Logout = () => {
        localStorage.clear();
    }

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="wallet"
            />

            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <div className="admin-nav-number-user"></div>
                    <div className="admin-nav-infor">
                        <Notification />
                        <Link className="btn btn-primary" to='/login' onClick={Logout}>Đăng xuất</Link>
                    </div>
                </div>
                <Container>
                    <h3>Quản lý ví FBS</h3>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nội dung</th>
                                <th>Thời gian</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}
