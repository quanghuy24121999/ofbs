import React, { useState } from 'react'
import {
    Button, Col, Input, Row, Container,
    FormGroup, Label, Modal, ModalHeader,
    ModalBody, ModalFooter
} from 'reactstrap';
import { Notify } from '../../common/notify';
import { api } from '../../config/axios';

// import firebase from "../../config/firebase";

// let recap = null;
// let event = '';

export default function Recharge() {
    const [money, setMoney] = useState('');
    // const [otp, setOtp] = useState('');
    const [active, setActive] = useState(0);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const onChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    // const onChangeOtp = (e) => {
    //     setOtp(e.target.value)
    // }

    const showContent = (type) => {
        if (type === 0) {
            document.getElementById('address').style.display = 'flex';
            document.getElementById('bank-info').style.display = 'none';
        } else if (type === 1) {
            document.getElementById('bank-info').style.display = 'flex';
            document.getElementById('address').style.display = 'none';
        }
    }


    const paypalChechout = () => {
        let description = '';
        if (active === 0) {
            description = 'Nạp tiền vào ví FBS - Tiền mặt';
            api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
                .then(res => {
                    const currentUser = res.data;
                    api.post(`/payment/save`,
                        {
                            "user": currentUser,
                            "fromToUser": currentUser,
                            "balanceChange": parseFloat(money),
                            "currentBalance": parseFloat(currentUser.balance) + parseFloat(money),
                            "description": description,
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
                        Notify('Yêu cầu nạp tiền của bạn đã được gửi lên hệ thống, chúng tôi sẽ xem xét và xử lý sớm nhất',
                            'success', 'top-right'
                        );
                        toggle();
                    })

                })
        } else if (active === 1) {
            description = 'Nạp tiền vào ví FBS - Chuyển khoản qua ngân hàng';
            api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
                .then(res => {
                    const currentUser = res.data;
                    api.post(`/payment/save`,
                        {
                            "user": currentUser,
                            "fromToUser": currentUser,
                            "balanceChange": parseFloat(money),
                            "currentBalance": parseFloat(currentUser.balance) + parseFloat(money),
                            "description": description,
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
                        Notify('Yêu cầu nạp tiền của bạn đã được gửi lên hệ thống, chúng tôi sẽ xem xét và xử lý sớm nhất',
                            'success', 'top-right'
                        );
                        toggle();
                    })
                })
        } else {
            description = 'Nạp tiền vào ví FBS - Ví Paypal';
            api.get(`/users/findByPhoneNumber/${localStorage.getItem("currentUser")}`)
                .then(res => {
                    const currentUser = res.data;
                    api.post(`/payment/save`,
                        {
                            "user": currentUser,
                            "fromToUser": currentUser,
                            "balanceChange": money,
                            "currentBalance": parseFloat(currentUser.balance) + parseFloat(money),
                            "description": description,
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
                            .then(res => {
                                window.location.replace(res.data);
                            }).catch(err => {
                                console.log(err);
                            });
                    })
                })
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
                <Col>
                    <FormGroup tag="fieldset">
                        <h6>Chọn phương thức nạp tiền</h6>
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
                                Nạp tiền bằng tiền mặt
                            </Label>
                            <div id="address">
                                <div>Địa chỉ: Khu công nghệ cao Hòa Lạc – Km29, ĐCT08, Thạch Hoà, Thạch Thất, Hà Nội</div>
                                <div>Số điện thoại: 0368020200</div>
                            </div>
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
                                Nạp tiền bằng chuyển khoản qua ngân hàng
                                <div id="bank-info">
                                    <div>Ngân hàng: Tien Phong Bank (TPBank)</div>
                                    <div>Số tài khoản: 02923354901</div>
                                    <div>Tên chủ tài khoản: Nguyễn Quang Huy</div>
                                    <div>Số điện thoại: 0368020200</div>
                                    <div>Nội dung chuyển tiền (vui lòng ghi theo mẫu):
                                        <i> Tên tài khoản FBS + số điện thoại đăng ký FBS + nạp tiền ví FBS. </i>
                                        Ví dụ: Nguyen Quang Huy 0368020200 nap tien vi FBS.
                                    </div>
                                </div>
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="radio"
                                    name="radio1"
                                    checked={active === 2}
                                    onClick={() => {
                                        setActive(2);
                                        showContent(2);
                                    }}
                                />{' '}
                                Nạp tiền bằng ví Paypal
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Col>
                <Col className="form-recharge">
                    <div>Nhập số tiền muốn nạp (VNĐ)</div>
                    <Input
                        type="number"
                        value={money}
                        onChange={onChangeMoney}
                        min={1}
                        placeholder="Nhập số tiền muốn nạp"
                    />
                    <Button color="success" onClick={() => {
                        if (parseFloat(money) > 0 && money !== '') {
                            toggle();
                        } else {
                            Notify('Vui lòng nhập số tiền cần nạp', 'error', 'top-right');
                        }
                    }}>Nạp tiền</Button>
                    <Modal isOpen={modal} toggle={toggle} className={``}>
                        <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
                        <ModalBody>
                            Bạn có chắc muốn nạp tiền ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={paypalChechout}>Đồng ý</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Quay lại</Button>
                        </ModalFooter>
                    </Modal>
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