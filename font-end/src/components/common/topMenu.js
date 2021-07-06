import React, { useEffect, useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    CardImg
} from "reactstrap";

import { Link, Redirect } from "react-router-dom";
import image from '../../images/logo_header-removebg-preview.png';
import axios from "axios";
import { FaBell } from "react-icons/fa";

const TopMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDisplay, setIsDisplay] = useState(false);

    const [currentUser, setCurrentUser] = useState();

    const [isLogout, setIsLogout] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        axios.get(`/users/findByPhoneNumber/${localStorage.getItem('currentUser')}`)
            .then(res => {
                setCurrentUser(res.data);
                if (res.data !== null && res.data !== undefined && res.data !== '')
                    localStorage.setItem('userId', res.data.id);
            });
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('userId');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('resId');
        localStorage.clear();
        setIsLogout(true);
    }

    const displayNotify = () => {
        setIsDisplay(!isDisplay);
        if (!isDisplay) {
            document.getElementById('notification').style.display = "flex";
        } else {
            document.getElementById('notification').style.display = "none";
        }
    }

    return (
        <div>
            <Navbar dark className="top-menu" expand="md">
                <NavbarBrand className="logo" href="/">
                    <CardImg src={image} alt="Logo" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} color="success" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto nav" navbar>
                        <div className="nav-section">
                            <NavItem>
                                <Link className="link" to="/">Trang chủ</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="link" to="/promotion">Ưu đãi hôm nay</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="link" to="/provider-register">Đăng ký nhà hàng</Link>
                            </NavItem>
                        </div>
                        {currentUser ? (
                            <div className="authen">
                                <NavItem className="icon-bell">
                                    <FaBell onClick={displayNotify} />
                                    <span className="icon-bell-dot"></span>
                                    <div className="notification" id="notification">
                                        <h5>Thông báo</h5>
                                        <hr />
                                        <div className="notify-content">
                                            <div className="notify-message">
                                                ajsdkasdhadkjashdkjasdhjashdajsdkasdhahdkjasdhjashdajsdkasdha
                                            </div>
                                            <div className="notify-time">
                                                {new Date().getDate()}
                                            </div>
                                        </div>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <Link
                                        className="link"
                                        onClick={() => {
                                            localStorage.setItem('userId', '');
                                            localStorage.setItem('userId', currentUser.id);
                                        }}
                                        to={{
                                            pathname: `/users/profile`,
                                            state: { userId: localStorage.getItem('userId') }
                                        }}
                                    >
                                        {currentUser.phoneNumber}
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="link" onClick={logout} to="/">Đăng xuất</Link>
                                </NavItem>
                            </div>
                        ) : (
                            <div className="authen">
                                <NavItem>
                                    <Link className="link" to="/login">Đăng nhập</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="link" to="/register">Đăng ký</Link>
                                </NavItem>
                            </div>)}
                    </Nav>
                </Collapse>
            </Navbar>
            {
                isLogout && <Redirect to={{
                    pathname: "/login"
                }} />
            }
        </div>
    );
};

export default TopMenu;
