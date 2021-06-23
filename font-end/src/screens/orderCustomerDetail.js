import React, { Component } from 'react';
import {
    Container, Nav, NavItem, CardImg
} from 'reactstrap';
import { Link } from 'react-router-dom';

import TopMenu from '../components/topMenu';
import Footer from '../components/footer';

export default class orderCustomerDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        const userId = this.props.match.params.userId;

        return (
            <div>
                <TopMenu />
                <Nav pills className="restaurant-detail-nav container">
                    <NavItem>
                        <Link to={`/users/profile/${userId}`}>Hồ sơ</Link>
                    </NavItem>
                    <NavItem className="active">
                        <Link to={`/users/profile/${userId}/order`}>Đơn của tôi</Link>
                    </NavItem>
                    <NavItem>
                        <Link to={``}>Ví FBS</Link>
                    </NavItem>
                </Nav>

                <Container className="order-detail-content">
                    <div className="order-detail-restaurant">
                        <CardImg className="od-restaurant-img" scr={``} alt="Nhà hàng"/>
                        <div className="od-restaurant-content">

                        </div>
                    </div>
                    <div className="order-detail-dish">

                    </div>
                    <div className="order-detail-combo">

                    </div>
                    <div className="order-detail-service">

                    </div>
                </Container>

                <Footer />
            </div>
        )
    }
}
