import React, { useState } from 'react'
import {
    Button, Col, Input, Row, Container
} from 'reactstrap';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

// import firebase from "../../config/firebase";

// let recap = null;
// let event = '';

export default function Recharge() {
    const [money, setMoney] = useState('');
    // const [otp, setOtp] = useState('');

    const onChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    // const onChangeOtp = (e) => {
    //     setOtp(e.target.value)
    // }

    const paypalChechout = () => {
        if (parseFloat(money) > 0 && money !== '') {
            api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
                .then(res => {
                    const currentUser = res.data;
                    api.post(`/payment/save`,
                        {
                            "user": currentUser,
                            "fromToUser": currentUser,
                            "balanceChange": money,
                            "currentBalance": parseFloat(currentUser.balance) + parseFloat(money),
                            "description": "Nạp tiền vào ví FBS",
                            "paymentType": {
                                "name": "charge"
                            }
                        },
                        {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }
                    ).then(res => {
                        localStorage.setItem("paymentHistoryId", res.data.id);
                        localStorage.setItem("paymentType", res.data.paymentType.name);

                        api({
                            method: 'POST',
                            url: `/payment/pay?price=${money / 23000}&description=${'Nạp tiền vào ví FBS'}`,
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })

                            // api.post(`/payment/pay?price=${money / 23000}&description=${'Nạp tiền vào ví FBS'}`, {
                            //     headers: {
                            //         'Authorization': 'Bearer ' + localStorage.getItem('token')
                            //     }
                            // })
                            .then(res => {
                                window.location.replace(res.data);
                            }).catch(err => {
                                console.log(err);
                            });
                    })
                })
        } else {
            Notify('Vui lòng nhập sô tiền cần nạp', 'error', 'top-right');
        }
    }

    // const [modal, setModal] = useState(false);

    // const checkCaptcha = () => {
    //     let phone = '+84368020200';

    //     if (!modal) {
    //         let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    //         firebase.auth().signInWithPhoneNumber(phone, recapcha)
    //             .then(function (e) {
    //                 recap = recapcha;
    //                 event = e;

    //                 toggle();
    //                 document.getElementById('verify-code').style.display = "flex";
    //                 document.getElementById('recaptcha').style.display = "none";
    //                 document.getElementById('btn-recharge').style.display = "flex";
    //             }).catch((error) => {
    //                 recapcha.clear();
    //                 console.log(error);
    //                 Notify("Lỗi hệ thống !", "error", "top-right");
    //             });
    //     }
    // }

    // const toggle = () => {
    //     setModal(!modal);
    // };

    // const recharge = (recapcha, e) => {
    //     if (otp === '' || otp === null) {
    //         Notify("Vui lòng nhập mã OTP !", "error", "top-right");
    //         return;
    //     } else {
    //         e.confirm(otp)
    //             .then(function (result) {
    //                 // api.post('')
    //                 //     .then(res => {
    //                 //         Notify("Đổi mật khẩu thành công !", "success", "top-right");
    //                 //         recapcha.clear();
    //                 //         window.location.reload();
    //                 //     })
    //                 Notify("Đổi mật khẩu thành công !", "success", "top-right");
    //                 toggle();
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 Notify("Mã OTP không chính xác !", "error", "top-right");
    //                 recapcha.clear();
    //                 window.location.reload();
    //             });
    //     }
    // }

    return (
        <Container className="wallet-recharge">
            <Row>
                <Col className="form-recharge">
                    <div>Nhập số tiền muốn nạp</div>
                    <Input
                        type="number"
                        value={money}
                        onChange={onChangeMoney}
                        min={1}
                        placeholder="Nhập số tiền muốn nạp"
                    />
                    <Button color="success" onClick={paypalChechout}>Nạp tiền</Button>
                    {/* <div id="recaptcha"></div> */}
                    {/* <Modal isOpen={modal} toggle={toggle} className={``}>
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
                </Modal> */}
                </Col>
            </Row>
        </Container>
    )
}
