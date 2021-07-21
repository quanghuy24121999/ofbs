import React, { useState } from 'react';
import {
    Container, Table, Nav, NavItem, NavLink,
    Row
} from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import SlideBar from '../../components/admin/SlideBar';
import { Link } from 'react-router-dom';

import Notification from '../../components/admin/Notification';
import { onChangeAdminTabWallet } from '../../common/changeLink';
import WalletManageRecharge  from '../../components/admin/WalletManageRecharge';
import WalletManageWithdrawal from '../../components/admin/WalletManageWithdrawal';
import Info from '../../components/wallet/info';

export default function Wallet() {
    const [toggled, setToggled] = useState(false);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const Logout = () => {
        localStorage.clear();
    }

    const [tab, setTab] = useState(1);

    const onChangeTab = (tab) => {
        onChangeAdminTabWallet(tab);
        setTab(tab);
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
                    <Nav pills className="order-nav-status">
                        <NavItem onClick={() => onChangeTab(1)}>
                            <NavLink active id="1">Lịch sử giao dịch</NavLink>
                        </NavItem>
                        <NavItem onClick={() => onChangeTab(2)}>
                            <NavLink id="2">Quản lý nạp tiền</NavLink>
                        </NavItem>
                        <NavItem onClick={() => onChangeTab(3)}>
                            <NavLink id="3">Quản lý rút tiền</NavLink>
                        </NavItem>
                    </Nav>
                    {
                        tab === 1 && <Row className="wallet-row">
                            <Info />
                        </Row>
                    }
                    {
                        tab === 2 && <Row className="wallet-row">
                            <WalletManageRecharge />
                        </Row>
                    }  
                    {
                        tab === 3 && <Row className="wallet-row">
                            <WalletManageWithdrawal />
                        </Row>
                    }                    
                </Container>
            </div>
        </div>
    )
}
