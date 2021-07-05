import { Component } from "react";
import firebase from "../config/firebase";
import {
    Form, FormGroup, Label, Input
} from 'reactstrap';
import axios from "axios";

import TopMenu from '../components/common/topMenu';
import { Notify } from '../common/notify';
class register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            phoneNumber: "",
            password: "",
            rePassword: "",
        }

        this.onchangeName = this.onchangeName.bind(this);
        this.onchangePhoneNumber = this.onchangePhoneNumber.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onchangeRePassword = this.onchangeRePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    }

    onchangeName(e) {
        this.setState({
            name: e.target.value
        })
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

    validateConfirmPassword() {
        const { password, rePassword } = this.state;

        if (password !== rePassword) {
            return false;
        } else {
            return true;
        }
    }

    handleClick(e) {
        e.preventDefault();

        let { name, password } = this.state;

        const phone = '+84' + this.state.phoneNumber.substring(1, this.state.phoneNumber.length);
        axios.get('/users/findByPhoneNumber/' + phone)
            .then(res => {
                if (res.data === null || res.data === '') {
                    if (this.validateConfirmPassword() === true) {
                        let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
                        firebase.auth().signInWithPhoneNumber(phone, recapcha)
                            .then(function (e) {
                                let code = prompt("Nhập mã OTP", "");
                                if (code == null) return;
                                e.confirm(code)
                                    .then(function (result) {
                                        axios.post('/users/register', {
                                            name: name,
                                            phoneLogin: phone,
                                            password: password,
                                            phoneNumber: phone
                                        })
                                        Notify("Đăng ký thành công !", "success", "top-right");
                                        recapcha.clear();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        Notify("Đăng ký thất bại !", "error", "top-right");
                                        recapcha.clear();
                                    });
                            }).catch((error) => {
                                console.log(error)
                            });
                    } else {
                        Notify("Mật khẩu không khớp !", "error", "top-right");
                    }
                } else {
                    Notify("Số điện thoại đã tồn tại !", "error", "top-right");
                }
            });
    }

    render() {
        let { name, phoneNumber, password, rePassword } = this.state;

        return (
            <div className="container">
                <TopMenu />
                <Form className="form-register" inline
                    onSubmit={this.handleClick}
                >
                    <div className="title-register">Đăng ký</div>
                    <FormGroup>
                        <Label for="name">Họ và tên</Label>
                        <Input
                            type="text"
                            name="Name"
                            id="name"
                            placeholder="Họ và tên "
                            value={name}
                            onChange={this.onchangeName}
                            required="required"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone-number" hidden>Số điện thoại:  </Label>
                        <div className="phone-number-input">
                            <span className="prefix-phone-input">(+84)</span>
                            <Input
                                className="input-phone-number"
                                type="tel"
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
                        <Label for="password" hidden>Mật khẩu :</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={this.onchangePassword}
                            required="required"
                            pattern={`[A-Za-z\d@$!%*#?&]{3,127}$]`}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="re-password" hidden>Nhập lại mật khẩu:</Label>
                        <Input
                            type="password"
                            name="rePassword"
                            id="re-password"
                            placeholder="Nhập lại mật khẩu"
                            value={rePassword}
                            onChange={this.onchangeRePassword}
                            required="required"
                            pattern={`[A-Za-z\d@$!%*#?&]{3,127}$]`}
                        // onBlur={this.onBlurRePassword(password, rePassword)}
                        />
                    </FormGroup>
                    {' '}
                    <div id="recaptcha"></div>
                    <Input type="submit" value="Đăng ký" className="btn-register btn btn-success btn-forget-password" />
                </Form>
            </div>
        );
    }
}

export default register;
