/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Container, Input, Table } from 'reactstrap';
import { FaBars, FaSearch } from 'react-icons/fa';
import SlideBar from '../../components/admin/SlideBar';
import { api } from '../../config/axios';
import Notification from '../../components/admin/Notification';
import { Link } from 'react-router-dom';
import UserItem from '../../components/admin/UserItem';
import ReactPaginate from 'react-paginate';

export default function User() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');

    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [toggled, setToggled] = useState(false);

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const onchangeName = (e) => {
        setName(e.target.value);
    }

    const onchangePhone = (e) => {
        setPhone(e.target.value);
    }

    const onchangeStatus = (e) => {
        setStatus(e.target.value);
    }

    useEffect(() => {
        receivedData(name, phone, status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, users.length])

    const search = () => {
        if (currentPage > 0) {
            setCurrentPage(0);
            setOffset(0);
        }
        receivedData(name, phone, status);
    }

    const handlePageClick = (e) => {
        window.scrollTo(0, 0);
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        // receivedData(0, '');
    };

    const receivedData = (name, phone, status) => {
        window.scrollTo(0, 0);

        api.get(`/users/adminViewUsers?phone=${phone}&name=${name}&status=${status}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const data = res.data;
                const slice = data.slice(offset, offset + perPage)
                const userPaging = slice.map((user, index) => {
                    return <UserItem receivedData={receivedData} key={index} user={user} count={index + 1} currentPage={currentPage}/>
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
                    <div className="admin-search-user">
                        <div>
                            <Input
                                type="text"
                                value={name}
                                onChange={onchangeName}
                                placeholder="Nhập tên người dùng"
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                value={phone}
                                onChange={onchangePhone}
                                placeholder="Nhập SĐT. VD: 0123..."
                            />
                        </div>
                        <div>
                            <Input
                                type="select"
                                value={status}
                                onChange={onchangeStatus}
                            >
                                <option value="">Tất cả</option>
                                <option value="active">Đang hoạt động</option>
                                <option value="inactive">Ngừng hoạt động</option>
                                <option value="banned">Đã bị chặn</option>
                            </Input>
                        </div>
                        <div>
                            <Button color="primary" onClick={() => search()}>
                                <FaSearch />
                            </Button>
                        </div>
                    </div>
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
