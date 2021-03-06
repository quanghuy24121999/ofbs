/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SlideBar from '../../components/admin/SlideBar';
import { FaBars } from 'react-icons/fa';
import {
    NavItem, Nav, Container, Table
} from 'reactstrap';
import { api } from '../../config/axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import RestaurantServiceItem from '../../components/admin/RestaurantServiceItem';
import Notification from '../../components/admin/Notification';

export default function RestaurantService(props) {
    const { restaurantId, restaurantName } = props.location.state;
    const [toggled, setToggled] = useState(false);
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [services, setServices] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        receivedData();
    }, [currentPage]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        // receivedData(0, '');
    };

    const receivedData = () => {
        api.get(`/services/search?restaurantId=${restaurantId}`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage)
                const servicesPaging = slice.map((service, index) => {
                    return <RestaurantServiceItem key={index} service={service} currentPage={currentPage} count={index + 1} restaurantId={restaurantId} receivedData={receivedData} />
                })

                setServices(servicesPaging);
                setPageCount(Math.ceil(data.length / perPage));
            })
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
                    <NavItem >
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
                    <NavItem >
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
                    <NavItem >
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
                    <NavItem className="active">
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
                    <NavItem>
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
                    <div className="table-responsive">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>T??n d???ch v???</th>
                                    <th>Gi?? (VN??)</th>
                                    <th>Lo???i d???ch v???</th>
                                    <th>Tr???ng th??i</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.length > 0 && services}
                            </tbody>
                        </Table>
                    </div>
                    {
                        (services && services.length > 0) ? <>
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
