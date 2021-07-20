import React, { useEffect, useState } from 'react';
import { Input, Table, Button } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { FaSearch } from 'react-icons/fa';

import { api } from '../../config/axios';
import HistoryItem from './historyItem';
import { formatCurrency } from '../../common/formatCurrency';

export default function Info() {
    const [status, setStatus] = useState('');
    const [paymentCode, setPaymentCode] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [balance, setBalance] = useState(0);

    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [history, setHistory] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    }

    const onChangeFrom = (e) => {
        setFromDate(e.target.value);
    };

    const onChangeTo = (e) => {
        setToDate(e.target.value);
    };

    const onChangePaymentCode = (e) => {
        setPaymentCode(e.target.value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        receivedData(status, paymentCode, fromDate, toDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const search = () => {
        receivedData(status, paymentCode, fromDate, toDate);
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        // receivedData(0, '');
    };

    const receivedData = (status, paymentCode, fromDate, toDate) => {
        window.scrollTo(0, 0);
        api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
            .then(res => {
                const currentUser = res.data;
                setBalance(currentUser.balance);
                api.get(`/payment/history?userId=${currentUser.id}&paymentCode=${paymentCode}&status=${status}&fromDate=${fromDate}&toDate=${toDate}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        const data = res.data;
                        const slice = data.slice(offset, offset + perPage)
                        const historyPaging = slice.map((history, index) => {
                            return <HistoryItem key={index} history={history} />
                        })

                        setHistory(historyPaging);
                        setPageCount(Math.ceil(data.length / perPage));
                    })
            })
    }

    return (
        <div className="wallet-info">
            <div className="balance">Số dư tài khoản: {formatCurrency(balance)} VNĐ</div>
            <div className="history">
                <h3 className="history-title">Lịch sử giao dịch</h3>
                <hr />
                <div className="wallet-search">
                    <div>
                        <Input
                            type="text"
                            value={paymentCode}
                            onChange={onChangePaymentCode}
                            placeholder="Mã giao dịch"
                        />
                    </div>

                    <div>
                        <Input
                            type="select"
                            name="status"
                            id="status"
                            onChange={onChangeStatus}
                            value={status}
                        >
                            <option value="">Tất cả</option>
                            <option value="success">Thành công</option>
                            <option value="pending">Đang xử lý</option>
                            <option value="fail">Thất bại</option>
                        </Input>
                    </div>
                    <div className="order-from">
                        <div><b>Từ </b></div>
                        <Input
                            type="date"
                            value={fromDate}
                            max={toDate}
                            onChange={onChangeFrom}
                        />
                    </div>
                    <div className="order-to">
                        <div><b>Đến </b></div>
                        <Input
                            type="date"
                            value={toDate}
                            min={fromDate}
                            onChange={onChangeTo}
                        />
                    </div>
                    <div>
                        <Button color="primary" className="btn-search-order" onClick={search}><FaSearch className="icon-search" /></Button>
                    </div>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Mã giao dịch</th>
                            <th>Loại</th>
                            <th>Số tiền (VNĐ)</th>
                            <th>Thời gian</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length > 0 && history}
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
            </div>
        </div>
    )
}
