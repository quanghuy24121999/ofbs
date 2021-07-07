import React, { useEffect, useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

import { formatDateForInput } from '../../common/formatDate';
import Notification from '../../components/admin/Notification';

function Dashboard() {
    let fromDate = new Date().setDate(new Date().getDate() - 7);
    let toDate = new Date();

    const [toggled, setToggled] = useState(false);
    const [from, setFrom] = useState(formatDateForInput(fromDate));
    const [to, setTo] = useState(formatDateForInput(toDate));
    const [pending, setPending] = useState(0);
    const [preparing, setPreparing] = useState(0);
    const [accomplished, setAccomplished] = useState(0);
    const [cancelled, setCancelled] = useState(0);

    const onChangeFrom = (e) => {
        setFrom(e.target.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        search();
    })

    const onChangeTo = (e) => {
        setTo(e.target.value);
    }

    const getTotalOrder = (status) => {
        axios.get(`/orders/getTotalOrderByStatus?status=${status}&fromDate=${from}&toDate=${to}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                if (status === 'pending') {
                    setPending(res.data);
                } else if (status === 'preparing') {
                    setPreparing(res.data);
                } else if (status === 'accomplished') {
                    setAccomplished(res.data);
                } else if (status === 'cancelled') {
                    setCancelled(res.data);
                }
            })
    }

    const search = () => {
        getTotalOrder('pending');
        getTotalOrder('preparing');
        getTotalOrder('accomplished');
        getTotalOrder('cancelled');
    }

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
                inComponent="admin"
            />
            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <Notification />
                    <Link className="btn btn-primary" to='/login' onClick={Logout}>Đăng xuất</Link>
                </div>
                <Container>
                    <Row className="dashboard-row">
                        <Col lg="8" md="12" sm="12">
                            <div>
                                {(pending !== 0 || preparing !== 0 || accomplished !== 0
                                    || cancelled !== 0) ? < Pie
                                    id="myChart"
                                    data={{
                                        labels: ["Đang chờ duyệt", "Chưa diễn ra", "Đã hoàn thành", "Đã hủy"],
                                        datasets: [
                                            {
                                                label: ["Đơn hàng"],
                                                data: [pending, preparing, accomplished, cancelled],
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
                                /> : <p className="chart-title">
                                    Không có đơn hàng nào trong khoảng thời gian này !
                                </p>
                                }
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
                            {/* <Button className="btn-search-chart" color="success" onClick={() => search()}>
                                <FaSearch />
                            </Button> */}
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
}

export default Dashboard;
