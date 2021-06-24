import React from 'react';
import { Table } from 'reactstrap';

export default function OrderDetailDishItem(props) {
    const listOrderDetails = props.listOrderDetails;
    let total = 0;
    let count = 1;

    return (
        <div className="order-detail-dish">
            <h2>Món ăn</h2>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên món ăn</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOrderDetails.map((item, index) => {
                            if (item.dish_id) {
                                total += item.price * item.quantity;
                                return (<tr key={index} className="od-dish-item">
                                    <th>{count++}</th>
                                    <td>{item.dish_name}</td>
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
            <div className="od-dish-item-total">Tổng tiền món ăn: {total} VNĐ</div>
        </div>
    )
}
