import React, { useState } from 'react';
import {
    Button, Col, Container, Input, Row,
    FormGroup, Label, Modal, ModalHeader,
    ModalBody, ModalFooter
} from 'reactstrap';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

export default function Withdrawal() {
    const [money, setMoney] = useState('');
    const [active, setActive] = useState(0);
    const [modal, setModal] = useState(false);
    const [content, setContent] = useState('');

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    const toggle = () => setModal(!modal);

    const onChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    const showContent = (type) => {
        if (type === 0) {
            document.getElementById('address').style.display = 'flex';
            document.getElementById('bank-info').style.display = 'none';
        } else if (type === 1) {
            document.getElementById('bank-info').style.display = 'flex';
            document.getElementById('address').style.display = 'none';
        }
    }

    const withdrawal = () => {
        let description = '';
        if (active === 0) {
            description = 'Rút tiền ví FBS - Tiền mặt';
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
                                "description": description,
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
                            toggle();
                        })
                    } else {
                        Notify('Số dư trong ví của bạn không đủ', 'error', 'top-right');
                    }
                })
        } else if (active === 1) {
            description = 'Rút tiền ví FBS - Chuyển khoản ngân hàng. Thông tin tài khoản: ' + content;
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
                                "description": description,
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
                            toggle();
                        })
                    } else {
                        Notify('Số dư trong ví của bạn không đủ', 'error', 'top-right');
                    }
                })
        }
    }

    return (
        <Container className="wallet-recharge">
            <Row >
                <Col>
                    <FormGroup tag="fieldset" className="recharge">
                        <div className="recharge-title">Chọn phương thức rút tiền</div>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="radio"
                                    name="radio1"
                                    checked={active === 0}
                                    onClick={() => {
                                        setActive(0);
                                        showContent(0);
                                    }}
                                />{' '}
                                <span className="type-recharge">Rút tiền bằng tiền mặt</span>
                            </Label>
                            <ul id="address">
                                <li><span className="bank-info-title">Địa chỉ:</span> Khu công nghệ cao Hòa Lạc – Km29, ĐCT08, Thạch Hoà, Thạch Thất, Hà Nội</li>
                                <li><span className="bank-info-title">Số điện thoại:</span> 0368020200</li>
                            </ul>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="radio"
                                    name="radio1"
                                    checked={active === 1}
                                    onClick={() => {
                                        setActive(1);
                                        showContent(1);
                                    }}
                                />{' '}
                                <span className="type-recharge">Rút tiền bằng chuyển khoản qua ngân hàng</span>
                                <ul id="bank-info">
                                    <li><span className="bank-info-title">Vui lòng ghi thông tin tài khoản ngân hàng theo mẫu:</span>
                                        <i> Tên ngân hàng + Tên chủ tài khoản ngân hàng + Số số tài khoản ngân hàng + Số điện thoại + Rút tiền ví FBS. </i><br />
                                    </li>
                                    <li><span className="bank-info-title">Ví dụ: </span>TP Bank, Nguyen Quang Huy, 02923354901, 0368020200, rut tien vi FBS.</li>
                                    <div className="description-withdrawal">
                                        <Input
                                            className="content"
                                            type="textarea"
                                            value={content}
                                            onChange={onChangeContent}
                                            placeholder="Nhập thông tin tài khoản ngân hàng"
                                        />
                                    </div>
                                </ul>
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Col>
                <Col className="form-recharge">
                    <div>Nhập số tiền muốn rút (VNĐ)</div>
                    <Input
                        type="number"
                        value={money}
                        onChange={onChangeMoney}
                        min={1}
                        placeholder="Nhập số tiền muốn rút"
                    />
                    <Button color="success" onClick={() => {
                        if (parseFloat(money) > 0 && money !== '') {
                            if (content.trim() !== '') {
                                toggle();
                            } else if (active === 1) {
                                Notify('Vui lòng nhập thông tin tài khoản ngân hàng của bạn', 'error', 'top-right');
                            } else {
                                toggle();
                            }
                        } else {
                            Notify('Vui lòng nhập số tiền cần rút', 'error', 'top-right');
                        }
                    }}>Rút tiền</Button>
                    <Modal isOpen={modal} toggle={toggle} className={``}>
                        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                        <ModalBody>
                            Bạn có chắc muốn rút tiền ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={withdrawal}>Đồng ý</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Quay lại</Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        </Container>
    )
}
