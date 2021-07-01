import React, { useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars } from 'react-icons/fa';
import { Container } from 'reactstrap';

function Order() {
    const [toggled, setToggled] = useState(false);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="order"
            />

            <div className="main">
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                    <FaBars />
                </div>
                <div className="navbar-top">
                    <div>Admin</div>
                    <div>Đăng xuất</div>
                </div>
                <Container>
                </Container>
            </div>

        </div>
    );
}

export default Order;
