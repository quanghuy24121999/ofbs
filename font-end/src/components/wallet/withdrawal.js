import React, { useState } from 'react';
import {
    Button, Col, Input, Row
} from 'reactstrap';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

export default function Withdrawal() {
    const [money, setMoney] = useState(0);

    const onChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    const withdrawal = () => {
        let userId = localStorage.getItem('userId');
        api.get(`/users/profile/?userId=${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            let name = res.data.user_name;
            api.post(`/notifications/insertNotification`,
                {
                    "content": `Khách hàng ${name} đã gửi yêu cầu rút tiền`,
                    "customer": null,
                    "provider": null,
                    "forAdmin": true,
                    "type": "wallet",
                    "read": false
                }
            ).then(() => {
                Notify('Gửi yêu cầu rút tiền thành công, hệ thống sẽ xem vào xử lý yêu cầu của bạn sớm nhất', 'success', 'top-right');
            })
        })
    }

    return (
        <Row className="wallet-recharge">
            <Col className="form-recharge">
                <div><b>Nhập số tiền muốn rút</b></div>
                <Input
                    type="number"
                    value={money}
                    onChange={onChangeMoney}
                />
                <Button color="success" onClick={withdrawal}>Rút tiền</Button>
            </Col>
        </Row>
    )
}
