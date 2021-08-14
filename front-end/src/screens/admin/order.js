/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars, FaSearch } from 'react-icons/fa';
import {
    Container, Input,
    Button, Table
} from 'reactstrap';
import { api } from '../../config/axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Notification from '../../components/admin/Notification';
import OrderItem from '../../components/admin/OrderItem';
import { formatDateForInput } from '../../common/formatDate';

function Order() {
    let fromDate = new Date().setDate(new Date().getDate() - 7);
    let toDate = new Date();

    const [toggled, setToggled] = useState(false);
    const [orderCode, setOrderCode] = useState('');
    const [from, setFrom] = useState(formatDateForInput(fromDate));
    const [to, setTo] = useState(formatDateForInput(toDate));
    const [status, setStatus] = useState('pending');
    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const onChangeOrderCode = (e) => {
        setOrderCode(e.target.value)
    };

    const onChangeFrom = (e) => {
        setFrom(e.target.value);
    };

    const onChangeTo = (e) => {
        setTo(e.target.value);
    };

    const onchangeStatus = (e) => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        receivedData(orderCode, from, to, status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
    };

    const receivedData = (orderCode, from, to, status) => {
        window.scrollTo(0, 0);
        api.get(`/orders/getOrders?orderCode=${orderCode}&fromDate=${from}&toDate=${to}&status=${status}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage)
                const ordersPaging = slice.map((order, index) => {
                    return <OrderItem key={index} order={order} />
                })

                setOrders(ordersPaging);
                setPageCount(Math.ceil(data.length / perPage));
            })
    }

    const search = () => {
        if (currentPage > 0) {
            setCurrentPage(0);
            setOffset(0);
        }
        receivedData(orderCode, from, to, status);
    }

    const Logout = () => {
        localStorage.clear();
    }

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="order"
            />

            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <div className="admin-nav-number-user"></div>
                    <div className="admin-nav-infor">
                        <div
                            className="admin-icon-search"
                            onClick={() => {
                                let element = document.getElementById('search-order-admin');
                                let element1 = document.getElementById('admin-order-content');

                                if (element !== undefined && element !== null) {
                                    if (element.style.display === "none" || element.style.display === "") {
                                        element.style.display = "flex";
                                        if (element1 !== undefined && element1 !== null) {
                                            element1.style.marginTop = '350px';
                                        }
                                    } else {
                                        element.style.display = "none";
                                        if (element1 !== undefined && element1 !== null) {
                                            element1.style.marginTop = '100px';
                                        }
                                    }
                                }
                            }}
                        >
                            <FaSearch />
                        </div>
                        <Notification />
                        <Link className="btn btn-primary" to='/login' onClick={Logout}>Đăng xuất</Link>
                    </div>
                </div>
                <Container id="admin-order-content">
                    <h4>Quản lý đơn hàng</h4>
                    <div className="search-order-admin" id="search-order-admin">
                        <div>
                            <Input
                                type="text"
                                id="order-id"
                                value={orderCode}
                                placeholder="Nhập mã đơn hàng"
                                onChange={onChangeOrderCode}
                            />
                        </div>
                        <div>
                            <Input
                                type="select"
                                value={status}
                                onChange={onchangeStatus}
                            >
                                <option value="">Tất cả</option>
                                <option value="pending">Đang chờ duyệt</option>
                                <option value="preparing">Chưa diễn ra</option>
                                <option value="accomplished">Đã hoàn thành</option>
                                <option value="cancelled">Đã Hủy</option>
                            </Input>
                        </div>
                        <div className="order-from">
                            <div><b>Từ </b></div>
                            <Input
                                type="date"
                                value={from}
                                max={to}
                                onChange={onChangeFrom}
                            />
                        </div>
                        <div className="order-to">
                            <div><b>Đến </b></div>
                            <Input
                                type="date"
                                value={to}
                                min={from}
                                onChange={onChangeTo}
                            />
                        </div>
                        <div>
                            <Button color="primary" className="btn-search-order" onClick={search}><FaSearch className="icon-search" /></Button>
                        </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                        <Table className="order-table">
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Tổng tiền (VNĐ)</th>
                                    <th>Ngày đặt</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 && orders}
                            </tbody>
                        </Table>
                    </div>
                    {
                        (orders && orders.length > 0) ? <>
                            {
                                pageCount > 1 && <ReactPaginate
                                    previousLabel={"Trang trước"}
                                    nextLabel={"Trang sau"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={3}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            }
                        </> : <div className="not-found">
                            Không tìm thấy kết quả nào
                        </div>
                    }
                </Container>
            </div>

        </div>
    );
}

export default Order;
