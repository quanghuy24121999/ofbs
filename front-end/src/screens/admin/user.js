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
                    return <UserItem receivedData={receivedData} key={index} user={user} count={index + 1} currentPage={currentPage} />
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
                        <div
                            className="admin-icon-search"
                            onClick={() => {
                                let element = document.getElementById('admin-search-user');
                                let element1 = document.getElementById('admin-user-content');

                                if (element !== undefined && element !== null) {
                                    if (element.style.display === "none" || element.style.display === "") {
                                        element.style.display = "flex";
                                        if (element1 !== undefined && element1 !== null) {
                                            element1.style.marginTop = '300px';
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
                        <Link className="btn btn-primary" to='/login' onClick={Logout}>????ng xu???t</Link>
                    </div>
                </div>
                <Container id="admin-user-content">
                    <h4>Qu???n l?? ng?????i d??ng</h4>
                    <div className="admin-search-user" id="admin-search-user">
                        <div>
                            <Input
                                type="text"
                                value={name}
                                onChange={onchangeName}
                                placeholder="Nh???p t??n ng?????i d??ng"
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                value={phone}
                                onChange={onchangePhone}
                                placeholder="Nh???p S??T. VD: 0123..."
                            />
                        </div>
                        <div>
                            <Input
                                type="select"
                                value={status}
                                onChange={onchangeStatus}
                            >
                                <option value="">T???t c???</option>
                                <option value="active">??ang ho???t ?????ng</option>
                                <option value="inactive">Ng???ng ho???t ?????ng</option>
                                <option value="banned">???? b??? ch???n</option>
                            </Input>
                        </div>
                        <div>
                            <Button color="primary" onClick={() => search()}>
                                <FaSearch />
                            </Button>
                        </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                        <Table className="restaurant-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>T??n ng?????i d??ng</th>
                                    <th>S??? ??i???n tho???i</th>
                                    <th>Vai tr??</th>
                                    <th>Tr???ng th??i</th>
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
                    </div>
                    {
                        (users && users.length > 0) ? <>
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
