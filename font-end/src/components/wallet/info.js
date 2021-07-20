import React, { useEffect, useState } from 'react';
import { Input, Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import { api } from '../../config/axios';
import HistoryItem from './historyItem';

export default function Info() {
    const [status, setStatus] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [history, setHistory] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
        receivedData(e.target.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        receivedData('', '', '', '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

        setCurrentPage(selectedPage);
        setOffset(offset);
        // receivedData(0, '');
    };

    const receivedData = (status) => {
        window.scrollTo(0, 0);
        api.get(``, {
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
    }

    return (
        <div className="wallet-info">
            <div className="balance">Số dư tài khoản: 2000000 VNĐ</div>
            <div className="history">
                <h5>Lịch sử giao dịch</h5>
                <div className="wallet-search">
                    <div for="status"><b>Trạng thái</b></div>
                    <Input
                        type="select"
                        name="status"
                        id="status"
                        onChange={onChangeStatus}
                        value={status}
                    >
                        <option value="1">Tất cả</option>
                        <option value="2">Thành công</option>
                        <option value="3">Đang xử lý</option>
                        <option value="4">Thất bại</option>
                    </Input>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Mã giao dịch</th>
                            <th>Loại</th>
                            <th>Sô tiền (VNĐ)</th>
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
