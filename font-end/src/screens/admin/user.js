import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import SlideBar from '../../components/admin/SlideBar';
import { api } from '../../config/axios';
import Notification from '../../components/admin/Notification';
import { Link } from 'react-router-dom';
import UserItem from '../../components/admin/UserItem';
import ReactPaginate from 'react-paginate';

export default function User() {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [toggled, setToggled] = useState(false);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        receivedData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, users.length])

    const search = () => {
        receivedData();
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        // receivedData(0, '');
    };

    const receivedData = () => {
        window.scrollTo(0, 0);

        api.get(`/users/adminViewUsers?phone&name&status`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage)
                const userPaging = slice.map((user, index) => {
                    return <UserItem receivedData={receivedData} key={index} user={user} count={index + 1} />
                })

                setUsers(userPaging);
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
                inComponent="user"
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
                    <h4>Quản lý người dùng</h4>
                    <hr />
                    <Table className="restaurant-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên người dùng</th>
                                <th>Số điện thoại</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 && users
                            }
                        </tbody>
                    </Table>
                    <ReactPaginate
                        previousLabel={"Trang trước"}
                        nextLabel={"Trang sau"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={5}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </Container>
            </div>
        </div>
    )
}
