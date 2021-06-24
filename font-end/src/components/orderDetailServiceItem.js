import React from 'react';
import { Table } from 'reactstrap';

export default function OrderDetailServiceItem(props) {
    const listOrderDetails = props.listOrderDetails;
    let total = 0;
    let count = 1;

    return (<div className="order-detail-service">
        <h2>Dịch vụ</h2>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên dịch vụ</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                </tr>
            </thead>
            <tbody>
                {
                    listOrderDetails.map((item, index) => {
                        if (item.service_id) {
                            total += item.price * item.quantity;
                            return (<tr key={index} className="od-service-item">
                                <th>{count++}</th>
                                <td>{item.service_name}</td>
                                <td>{item.price} VNĐ</td>
                                <td>{item.quantity}</td>
                            </tr>
                            )
                        } else {
                            return <tr key={index}></tr>
                        }
                    })
                }
            </tbody>
        </Table>
        <div className="od-service-item-total">Tổng tiền dịch vụ: {total} VNĐ</div>
    </div>
    )
}
