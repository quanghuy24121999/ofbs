import React from 'react';
import { formatCurrency } from '../../common/formatCurrency';
import { formatDate } from '../../common/formatDate';

export default function HistoryItem(props) {
    const history = props.history;
    let type = history.payment_type;
    let status = history.status;

    if (type === 'refund') {
        type = 'Hoàn tiền';
    } else if (type === 'pay') {
        type = 'Chuyển tiền';
    } else if (type === 'charge') {
        type = 'Nạp tiền';
    } else if (type === 'withdrawal') {
        type = 'Rút tiền';
    }

    if (status === 'success') {
        status = <div style={{ color: 'green', fontWeight: '500' }}>Thành công</div>
    } else if (status === 'fail') {
        status = <div style={{ color: 'red', fontWeight: '500' }}>Thất bại</div>
    } else {
        status = <div style={{ color: 'purple', fontWeight: '500' }}>Đang xử lý</div>
    }

    return (
        <tr>
            <td>{history.payment_code}</td>
            <td>{type}</td>
            <td>{formatCurrency(parseFloat(history.balance_change))}</td>
            <td>{formatDate(history.date_of_change)}</td>
            <td>{history.description}</td>
            <td>{status}</td>
        </tr>
    )
}
