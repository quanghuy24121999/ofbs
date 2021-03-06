import { api } from '../config/axios';
import React, { Component } from 'react'
import {
    Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import firebase from "../config/firebase";
import TopMenu from '../components/common/topMenu';
import { Notify } from '../common/notify';
import { validatePassword } from '../common/validate';
import Messenger from '../components/common/messenger';

let userId = '';
let recap = null;
let event = '';
export default class forgetPassword extends Component {
    constructor() {
        super();

        this.state = {
            phoneNumber: "",
            password: "",
            rePassword: "",
            code: "",
        }

        this.onchangePhoneNumber = this.onchangePhoneNumber.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onchangeRePassword = this.onchangeRePassword.bind(this);
        this.onchangeCode = this.onchangeCode.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
        this.verifyCode = this.verifyCode.bind(this);
    }

    onchangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    onchangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onchangeRePassword(e) {
        this.setState({
            rePassword: e.target.value
        });
    }

    onchangeCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    updatePassword() {
        api.patch('/update/' + this.state.userId, {
            "password": this.state.password
        })
    }

    handleClick(e) {
        e.preventDefault();

        let phoneNumber = this.state.phoneNumber;
        phoneNumber = '+84' + phoneNumber.substring(1, phoneNumber.length);
        api.get('/users/findByPhoneNumber/' + phoneNumber)
            .then(res => {
                if (res.data !== null && res.data !== '') {
                    if (this.validateConfirmPassword() === true) {
                        let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
                        firebase.auth().signInWithPhoneNumber(phoneNumber, recapcha)
                            .then(function (e) {
                                userId = res.data.id;
                                recap = recapcha;
                                event = e;

                                document.getElementById('verify-code').style.display = "flex";
                                document.getElementById('recaptcha').style.display = "none";
                                document.getElementById('btn-forget-password').style.display = "none";
                            }).catch((error) => {
                                recapcha.clear();
                                Notify("L???i h??? th???ng !", "error", "top-right");
                            });
                    }
                } else {
                    Notify("S??? ??i???n tho???i kh??ng ????ng !", "error", "top-right");
                }
            });
    }

    validateConfirmPassword() {
        const { password, rePassword } = this.state;

        if (validatePassword(password)) {
            if (password !== rePassword) {
                Notify("M???t kh???u kh??ng kh???p !", "error", "top-right");
                return false;
            } else {
                return true;
            }
        } else {
            Notify('Vui l??ng nh???p m???t kh???u t??? 3-32 k?? t??? v?? kh??ng bao g???m kho???ng tr???ng', 'error', 'top-right')
        }
    }

    verifyCode(userId, recapcha, e) {
        if (this.state.code !== '') {
            let code = this.state.code;
            let password = this.state.password;
            if (code === null || code === '') return;

            e.confirm(code)
                .then(function (result) {
                    api.patch('/users/update/' + userId, {
                        "password": password
                    }).then(res => {
                        Notify("?????i m???t kh???u th??nh c??ng !", "success", "top-right");
                        recapcha.clear();
                        window.location.reload();
                    })
                })
                .catch((error) => {
                    Notify("M?? OTP kh??ng ch??nh x??c !", "error", "top-right");
                    recapcha.clear();
                    window.location.reload();
                });
        } else {
            Notify("Vui l??ng nh???p m?? OTP !", "error", "top-right");
        }
    }

    render() {
        let { phoneNumber, password, rePassword } = this.state;

        return (
            <div className="container">
                <TopMenu />
                <Form inline className="form-forget-password" onSubmit={this.handleClick}>
                    <div className="title-foget-password">Qu??n m???t kh???u</div>
                    <FormGroup>
                        <Label for="phone-number">
                            <b>S??? ??i???n tho???i <span className="require-icon">*</span></b>
                        </Label>
                        <div className="phone-number-input">
                            {/* <span className="prefix-phone-input">(+84)</span> */}
                            <Input
                                className="input-phone-number"
                                type="text"
                                name="phoneNumber"
                                id="phone-number"
                                placeholder="S??? ??i???n tho???i"
                                value={phoneNumber}
                                onChange={this.onchangePhoneNumber}
                                required="required"
                            />
                        </div>
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="new-password">
                            <b>M???t kh???u m???i <span className="require-icon">*</span></b>
                        </Label>
                        <Input
                            type="password"
                            name="newPassword"
                            id="new-password"
                            placeholder="M???t kh???u m???i"
                            value={password}
                            onChange={this.onchangePassword}
                            required="required"
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="re-new-password">
                            <b>Nh???p l???i m???t kh???u m???i <span className="require-icon">*</span></b>
                        </Label>
                        <Input
                            type="password"
                            name="reNewPassword"
                            id="re-new-password"
                            placeholder="Nh???p l???i m???t kh???u m???i"
                            value={rePassword}
                            onChange={this.onchangeRePassword}
                            required="required"
                        />
                    </FormGroup>
                    {' '}
                    <div id="recaptcha"></div>

                    <Input
                        type="submit"
                        value="G???i m?? OTP"
                        className="btn-register btn btn-success btn-forget-password"
                        id="btn-forget-password"
                    />
                    <Form id="verify-code">
                        <b><span className="require-icon">*</span></b>
                        <Input
                            type="text"
                            id="code"
                            onChange={this.onchangeCode}
                            value={this.state.code}
                            required="required"
                            placeholder="Nh???p m?? OTP"
                        />
                        <Button
                            id="btn-code"
                            color="primary"
                            onClick={() => this.verifyCode(userId, recap, event)}
                        >
                            X??c nh???n
                        </Button>
                    </Form>
                </Form>

                <ToastContainer />
                <Messenger />
            </div>
        )
    }
}
