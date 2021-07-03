import React, { useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Button, Label } from 'reactstrap';
import { Bar, Pie } from 'react-chartjs-2';

function Dashboard() {
    const [toggled, setToggled] = useState(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const onChangeFrom = (e) => {
        setFrom(e.target.value);
    }

    const onChangeTo = (e) => {
        setTo(e.target.value);
    }

    const search = () => {

    }

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const Logout = () => {
        localStorage.removeItem('currentAdmin');
    }

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="admin"
            />
            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <Link className="btn btn-primary" to='/login' onClick={Logout}>Đăng xuất</Link>
                </div>
                <Container>
                    <Row className="dashboard-row">
                        <Col lg="8" md="12" sm="12">
                            <div>
                                <Pie
                                    id="myChart"
                                    data={{
                                        labels: ["Đang chờ duyệt", "Chưa diễn ra", "Đã hoàn thành", "Đã hủy"],
                                        datasets: [
                                            {
                                                label: ["Đơn hàng"],
                                                data: [1, 5, 9, 10],
                                                backgroundColor: [
                                                    '#831ae4d9',
                                                    '#5771cfd9',
                                                    '#12c32fd9',
                                                    '#db4646d9'
                                                ],
                                                borderColor: [
                                                    '#831ae4d9',
                                                    '#5771cfd9',
                                                    '#12c32fd9',
                                                    '#db4646d9'
                                                ],
                                                borderWidth: 1,
                                            }
                                        ]
                                    }}
                                    width={50}
                                    height={300}
                                    options={{
                                        maintainAspectRatio: false,
                                        responsive: true,
                                        // scales: {
                                        //     yAxes: [{
                                        //         ticks: {
                                        //             beginAtZero: true
                                        //         }
                                        //     }]
                                        // }
                                    }}
                                />
                            </div>
                            <p className="chart-title">Thống kê đơn hàng theo thời gian</p>
                        </Col>
                        <Col className="search-chart" lg="4" md="12" sm="12">
                            <div className="input-search-chart">
                                <Label for="from"><b>Từ ngày :</b></Label>
                                <Input
                                    id="from"
                                    type="date"
                                    value={from}
                                    onChange={onChangeFrom}
                                />
                            </div>
                            <div className="input-search-chart">
                                <Label for="to"><b>Đến ngày :</b></Label>
                                <Input
                                    id="to"
                                    type="date"
                                    value={to}
                                    onChange={onChangeTo}
                                />
                            </div>
                            <Button className="btn-search-chart" color="success" onClick={() => search()}>
                                <FaSearch />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
}

export default Dashboard;
