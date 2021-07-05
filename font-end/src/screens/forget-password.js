import axios from 'axios';
import React, { Component } from 'react'
import {
    Form, FormGroup, Label, Input, Toast,
    ToastBody, ToastHeader, Alert
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import firebase from "../config/firebase";
import TopMenu from '../components/common/topMenu';
import { Notify } from '../common/notify';

export default class forgetPassword extends Component {
    constructor() {
        super();

        this.state = {
            phoneNumber: "",
            password: "",
            rePassword: ""
        }

        this.onchangePhoneNumber = this.onchangePhoneNumber.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onchangeRePassword = this.onchangeRePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    }

    onchangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    onchangePassword(e) {
        this.setState({
            // password: e.target.value.match(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,15}$`)
            password: e.target.value
        });
    }

    onchangeRePassword(e) {
        this.setState({
            rePassword: e.target.value
        });
    }

    updatePassword() {
        console.log(this.state.userId);
        axios.patch('/update/' + this.state.userId, {
            "password": this.state.password
        })
    }

    handleClick(e) {
        e.preventDefault();

        let { password } = this.state;
        let phoneNumber = this.state.phoneNumber;
        phoneNumber = '+84' + phoneNumber.substring(1, phoneNumber.length);
        axios.get('/users/findByPhoneNumber/' + phoneNumber)
            .then(res => {
                if (res.data !== null && res.data !== '') {
                    if (this.validateConfirmPassword() === true) {

                        let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
                        firebase.auth().signInWithPhoneNumber(phoneNumber, recapcha)
                            .then(function (e) {
                                let code = prompt("Nhập mã OTP", "");
                                if (code == null) return;
                                e.confirm(code)
                                    .then(function (result) {
                                        axios.patch('/users/update/' + res.data.id, {
                                            "password": password
                                        })
                                        Notify("Đổi mật khẩu thành công !", "success", "top-right");
                                        recapcha.clear();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        Notify("Đổi mật khẩu không thành công !", "error", "top-right");
                                        recapcha.clear();
                                    });
                            }).catch((error) => {
                                console.log(error)
                            });
                    } else {
                        Notify("Mật khẩu không khớp !", "error", "top-right");
                    }
                } else {
                    Notify("Số điện thoại không đúng !", "error", "top-right");
                }
            });
    }

    validateConfirmPassword() {
        const { password, rePassword } = this.state;

        if (password !== rePassword) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        let { phoneNumber, password, rePassword } = this.state;

        return (
            <div className="container">
                <TopMenu />
                <Form inline className="form-forget-password" onSubmit={this.handleClick}>
                    <div className="title-foget-password">Quên mật khẩu</div>
                    <FormGroup>
                        <Label for="phone-number" hidden>Số điện thoại:  </Label>
                        <div className="phone-number-input">
                            <span className="prefix-phone-input">(+84)</span>
                            <Input
                                className="input-phone-number"
                                type="text"
                                name="phoneNumber"
                                id="phone-number"
                                placeholder="Số điện thoại"
                                value={phoneNumber}
                                onChange={this.onchangePhoneNumber}
                                required="required"
                            />
                        </div>
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="new-password" hidden>Mật khẩu mới:</Label>
                        <Input
                            type="password"
                            name="newPassword"
                            id="new-password"
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChange={this.onchangePassword}
                            required="required"
                            pattern={`[A-Za-z\d@$!%*#?&]{3,127}$]`}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="re-new-password" hidden>Nhập lại mật khẩu mới:</Label>
                        <Input
                            type="password"
                            name="reNewPassword"
                            id="re-new-password"
                            placeholder="Nhập lại mật khẩu mới"
                            value={rePassword}
                            onChange={this.onchangeRePassword}
                            required="required"
                            pattern={`[A-Za-z\d@$!%*#?&]{3,127}$]`}
                        // onBlur={this.onBlurRePassword(password, rePassword)}
                        />
                    </FormGroup>
                    {' '}
                    <div id="recaptcha"></div>
                    <Input type="submit" value="Gửi mã OTP" className="btn-register btn btn-success btn-forget-password" />
                </Form>
                <ToastContainer />
            </div>
        )
    }
}
