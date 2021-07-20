import React, { useState } from 'react'
import {
    Button, Col, Input, Row,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

import firebase from "../../config/firebase";

let recap = null;
let event = '';

export default function Recharge() {
    const [money, setMoney] = useState(0);
    const [otp, setOtp] = useState('');

    const onChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    const onChangeOtp = (e) => {
        setOtp(e.target.value)
    }

    const [modal, setModal] = useState(false);

    const checkCaptcha = () => {
        let phone = '+84368020200';

        if (!modal) {
            let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
            firebase.auth().signInWithPhoneNumber(phone, recapcha)
                .then(function (e) {
                    recap = recapcha;
                    event = e;

                    toggle();
                    document.getElementById('verify-code').style.display = "flex";
                    document.getElementById('recaptcha').style.display = "none";
                    document.getElementById('btn-recharge').style.display = "flex";
                }).catch((error) => {
                    recapcha.clear();
                    console.log(error);
                    Notify("Lỗi hệ thống !", "error", "top-right");
                });
        }
    }

    const toggle = () => {
        setModal(!modal);
    };

    const recharge = (recapcha, e) => {
        if (otp === '' || otp === null) {
            Notify("Vui lòng nhập mã OTP !", "error", "top-right");
            return;
        } else {
            e.confirm(otp)
                .then(function (result) {
                    // api.post('')
                    //     .then(res => {
                    //         Notify("Đổi mật khẩu thành công !", "success", "top-right");
                    //         recapcha.clear();
                    //         window.location.reload();
                    //     })
                    Notify("Đổi mật khẩu thành công !", "success", "top-right");
                    toggle();
                })
                .catch((error) => {
                    console.log(error);
                    Notify("Mã OTP không chính xác !", "error", "top-right");
                    recapcha.clear();
                    window.location.reload();
                });
        }
    }

    return (
        <Row className="wallet-recharge">
            <Col className="info-bank-fbs">
                <div>Thông tin tài khoản FBS</div>
                <div>Tên tài khoản: Feast Booking System</div>
                <div>Số tài khoản: 02923354901</div>
                <div>Tên ngân hàng: TP Bank</div>
            </Col>
            <Col className="form-recharge">
                <div><b>Nhập số tiền muốn nạp</b></div>
                <Input
                    type="number"
                    value={money}
                    onChange={onChangeMoney}
                />
                <Button color="success" onClick={() => checkCaptcha()}>Nạp tiền</Button>
                <div id="recaptcha"></div>
                <Modal isOpen={modal} toggle={toggle} className={``}>
                    <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                    <ModalBody>
                        <div id="verify-code">
                            <b><span className="require-icon">*</span></b>
                            <Input
                                type="text"
                                id="code"
                                value={otp}
                                onChange={onChangeOtp}
                                required="required"
                                placeholder="Nhập mã OTP"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button id="btn-recharge" color="success" onClick={() => recharge(recap, event)}>Đồng ý</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Quay lại</Button>
                    </ModalFooter>
                </Modal>
            </Col>
        </Row>
    )
}
