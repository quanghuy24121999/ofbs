import React, { useState } from 'react';
import {
    Button, Col, Container, Input, Row
} from 'reactstrap';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

export default function Withdrawal() {
    const [money, setMoney] = useState('');

    const onChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    const withdrawal = () => {
        if (parseFloat(money) > 0 && money !== '') {
            api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
                .then(res => {
                    const currentUser = res.data;
                    if (parseFloat(currentUser.balance) >= money) {
                        api.post(`/payment/save`,
                            {
                                "user": currentUser,
                                "fromToUser": currentUser,
                                "balanceChange": parseFloat(money * -1),
                                "currentBalance": parseFloat(currentUser.balance) - parseFloat(money),
                                "description": "Rút tiền ví FBS",
                                "paymentType": {
                                    "name": "withdrawal"
                                }
                            },
                            {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }
                        ).then(res => {
                            Notify('Yêu cầu rút tiền của bạn đã được gửi lên hệ thống, chúng tôi sẽ xem xét và xử lý sớm nhất',
                                'success', 'top-right'
                            );
                        })
                    } else {
                        Notify('Số dư trong ví của bạn không đủ', 'error', 'top-right');
                    }
                })
        } else {
            Notify('Vui lòng nhập sô tiền cần rút', 'error', 'top-right');
        }
    }

    return (
        <Container className="wallet-recharge">
            <Row >
                <Col className="form-recharge">
                    <div>Nhập số tiền muốn rút (VNĐ)</div>
                    <Input
                        type="number"
                        value={money}
                        onChange={onChangeMoney}
                        min={1}
                        placeholder="Nhập số tiền muốn rút"
                    />
                    <Button color="success" onClick={withdrawal}>Rút tiền</Button>
                </Col>
            </Row>
        </Container>
    )
}
