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
import image from '../images/logo_header-removebg-preview.png';
import axios from "axios";

const TopMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState();

    const [isLogout, setIsLogout] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        axios.get(`/users/findByPhoneNumber/${localStorage.getItem('currentUser')}`)
            .then(res => {
                setCurrentUser(res.data);
            });
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        setIsLogout(true);
    }

    return (
        <div>
            <Navbar className="top-menu" expand="md">
                <NavbarBrand className="logo" href="/">
                    <CardImg src={image} alt="Logo" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto nav" navbar>
                        <div>
                            <NavItem>
                                <Link className="link" to="/">Trang chủ</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="link" to="/promotion">Ưu đãi hôm nay</Link>
                            </NavItem>
                        </div>
                        {currentUser ? (
                            <div className="authen">
                                <NavItem>
                                    <Link className="link" to={`/users/profile/${currentUser.id}`}>{currentUser.phoneNumber}</Link>
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
