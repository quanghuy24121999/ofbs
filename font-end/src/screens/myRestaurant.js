import React, { Component } from 'react';
import { Nav, NavItem, } from 'reactstrap';
import { Link } from 'react-router-dom';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';

export default class myRestaurant extends Component {
    render() {
        const userId = this.props.match.params.userId;

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem>
                        <Link to={`/users/profile/${userId}`}>Hồ sơ</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={`/users/profile/${userId}/order`}>Đơn của tôi</Link>
                    </NavItem>
                    <NavItem className="active">
                        <Link to={`/users/profile/${userId}/my-restaurant`}>Nhà hàng của tôi</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={``}>Ví FBS</Link>
                    </NavItem>
                </Nav>
                <Footer />
            </div>
        )
    }
}
