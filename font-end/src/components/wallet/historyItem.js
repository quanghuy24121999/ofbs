import React from 'react';
import { Button } from 'reactstrap';
import { formatCurrency } from '../../common/formatCurrency';
import { formatDate } from '../../common/formatDate';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

export default function HistoryItem(props) {
    const history = props.history;
    const typePayment = props.type;
    let type = history.payment_type;
    let status = history.status;
    let money = parseFloat(history.balance_change);

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

    if (money >= 0) {
        money = <div style={{ color: 'green', fontWeight: '500' }}>+{formatCurrency(money)}</div>
    } else {
        money = <div style={{ color: 'red', fontWeight: '500' }}>-{formatCurrency(money * (-1))}</div>
    }

    const updateStatus = () => {
        api.get(`/users/findByPhoneNumber/${history.phone_login}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const currentUser = res.data;
                api({
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    url: `/payment/updateStatus?paymentId=${history.id}&status=success`
                }).then(res => {
                    api({
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        url: `users/updateBalance?balance=${parseFloat(currentUser.balance) + parseFloat(history.balance_change)}&userId=${currentUser.id}`
                    })
                        .then(res => {
                            let customer = null;
                            let provider = null;

                            if (currentUser.role.name === 'ROLE_PROVIDER') {
                                provider = currentUser;
                            } else if (currentUser.role.name === 'ROLE_CUSTOMER') {
                                customer = currentUser;
                            }
                            api.post(`/notifications/insertNotification`,
                                {
                                    "content": `Yêu cầu rút tiền của bạn đã được xử lý, vui lòng kiểm tra số tài khoản, 
                                        nếu chưa nhận được tiền trong vòng 24h vui lòng liên hệ lại với chúng tôi qua Messenger `,
                                    "customer": customer,
                                    "provider": provider,
                                    "forAdmin": false,
                                    "type": "report",
                                    "read": false
                                }
                            ).then(res => {
                                Notify('Xác nhận thành công', 'success', 'top-right');
                            })
                        })
                })
            })
    }

    const updateStatusCharge = () => {
        api.get(`/users/findByPhoneNumber/${history.phone_login}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                const currentUser = res.data;
                api({
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    url: `/payment/updateStatus?paymentId=${history.id}&status=success`
                }).then(res => {
                    api({
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        url: `users/updateBalance?balance=${parseFloat(currentUser.balance) + parseFloat(history.balance_change)}&userId=${currentUser.id}`
                    })
                        .then(res => {
                            let customer = null;
                            let provider = null;

                            if (currentUser.role.name === 'ROLE_PROVIDER') {
                                provider = currentUser;
                            } else if (currentUser.role.name === 'ROLE_CUSTOMER') {
                                customer = currentUser;
                            }
                            api.post(`/notifications/insertNotification`,
                                {
                                    "content": `Yêu cầu nạp tiền của bạn đã được xử lý, vui lòng kiểm tra số tài khoản, 
                                        nếu chưa nhận được tiền trong vòng 24h vui lòng liên hệ lại với chúng tôi qua Messenger`,
                                    "customer": customer,
                                    "provider": provider,
                                    "forAdmin": false,
                                    "type": "report",
                                    "read": false
                                }
                            ).then(res => {
                                Notify('Xác nhận thành công', 'success', 'top-right');
                            })
                        })
                })
            })
    }

    return (
        <tr>
            <td>{history.payment_code}</td>
            <td>{type}</td>
            <td>{money}</td>
            <td>{formatDate(history.date_of_change)}</td>
            <td>{history.description}</td>
            <td>{status}</td>
            {
                typePayment === 'withdrawal' && <td>
                    <Button
                        color="primary"
                        onClick={() => updateStatus()}
                    >
                        Xác nhận
                    </Button>
                </td>
            }
            {
                typePayment === 'charge' && <td>
                    <Button
                        color="primary"
                        onClick={() => updateStatusCharge()}
                    >
                        Xác nhận
                    </Button>
                </td>
            }
        </tr>
    )
}
