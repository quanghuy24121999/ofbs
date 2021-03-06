/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa';
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';
import { Button, Container, Input, Nav, NavItem, Table } from 'reactstrap'
import Notification from '../../components/admin/Notification';
import OrderItem from '../../components/admin/OrderItem';
import SlideBar from '../../components/admin/SlideBar';
import MyRestaurantOrderItem from '../../components/provider/myRestaurantOrderItem';
import { api } from '../../config/axios';

export default function RestaurantOrder(props) {
    const { restaurantId, restaurantName } = props.location.state;
    const [toggled, setToggled] = useState(false);
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [pageCount, setPageCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [orderId, setOrderId] = useState('');
    const [orders, setOrders] = useState('');

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        receivedData(orderId);
    };

    useEffect(() => {
        receivedData(orderId);
    }, [])

    const onChangeOrderId = (e) => {
        e.preventDefault();
        setOrderId(e.target.value);
    }

    const receivedData = (orderCode) => {
        window.scrollTo(0, 0);
        api.get(`/orders/restaurant?restaurantId=${restaurantId}&orderCode=${orderCode}`, {
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
            });
    }

    const search = (e) => {
        e.preventDefault();
        receivedData(orderId);
    }

    const Logout = () => {
        localStorage.clear();
    }

    return (
        <div className={`admin ${toggled ? 'toggled' : ''}`}>
            <SlideBar
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                inComponent="restaurant"
            />
            <div className="main">
                <div className="navbar-top">
                    <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                        <FaBars />
                    </div>
                    <div className="admin-nav-number-user"></div>
                    <div className="admin-nav-infor">
                        <Notification />
                        <Link className="btn btn-primary" to='/login' onClick={Logout}>????ng xu???t</Link>
                    </div>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: '500' }}>{restaurantName}</div>
                <Nav pills className="restaurant-detail-nav admin-res-nav container">
                    <NavItem>
                        <Link to={{
                            pathname: `/admin/restaurant/detail`,
                            state: {
                                restaurantId: restaurantId,
                                restaurantName: restaurantName
                            }
                        }}>
                            Th??ng tin
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={{
                            pathname: `/admin/restaurant/image`,
                            state: {
                                restaurantId: restaurantId,
                                restaurantName: restaurantName
                            }
                        }}
                        >???nh
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={{
                            pathname: `/admin/restaurant/menu`,
                            state: {
                                restaurantId: restaurantId,
                                restaurantName: restaurantName
                            }
                        }}
                        >
                            Th???c ????n
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={{
                            pathname: `/admin/restaurant/combo`,
                            state: {
                                restaurantId: restaurantId,
                                restaurantName: restaurantName
                            }
                        }}
                        >
                            Combo m??n ??n
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={{
                            pathname: `/admin/restaurant/service`,
                            state: {
                                restaurantId: restaurantId,
                                restaurantName: restaurantName
                            }
                        }}
                        >
                            D???ch v???
                        </Link>
                    </NavItem>
                    <NavItem className="active">
                        <Link to={{
                            pathname: `/admin/restaurant/order`,
                            state: {
                                restaurantId: restaurantId,
                                restaurantName: restaurantName
                            }
                        }}
                        >
                            ????n h??ng
                        </Link>
                    </NavItem>
                </Nav>
                <Container>
                    <h3>????n h??ng</h3>
                    <hr />
                    <div className="search-order">
                        <Input
                            type="text"
                            id="order-id"
                            value={orderId}
                            placeholder="Nh???p m?? ????n h??ng"
                            onChange={onChangeOrderId}
                        />
                        <div >
                            <Button color="primary" className="btn-search-order" onClick={search}>
                                <FaSearch className="icon-search" />
                            </Button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <Table className="order-table">
                            <thead>
                                <tr>
                                    <th>M?? ????n</th>
                                    <th>T???ng ti???n (VN??)</th>
                                    <th>Ng??y ?????t</th>
                                    <th>Tr???ng th??i</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders}
                            </tbody>
                        </Table>
                    </div>
                    {
                        (orders && orders.length > 0) ? <>
                            {
                                pageCount > 1 && <ReactPaginate
                                    previousLabel={"Trang tr?????c"}
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
                            Kh??ng t??m th???y k???t qu??? n??o
                        </div>
                    }
                </Container>
            </div>
        </div>
    )
}
