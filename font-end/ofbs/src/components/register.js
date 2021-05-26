import { Component } from "react";
import firebase from "../config/firebase";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class register extends Component {
    constructor() {
        super();

        this.state = {
            phoneNumber: "",
            password: ""
        }

        this.onchangePhoneNumber = this.onchangePhoneNumber.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(e) {
        e.preventDefault();

        let phoneNumber = this.state.phoneNumber;
        let recapcha = new firebase.auth.RecaptchaVerifier("recaptcha");
        firebase.auth().signInWithPhonephoneNumber(phoneNumber, recapcha)
            .then(function (e) {
                let code = prompt("Nhập mã OTP", "");
                if (code == null) return;
                e.confirm(code)
                    .then(function (result) {
                        console.log(result.user, "user");
                        document.querySelector("label").textContent =
                            result.user.phoneNumber + "Number verified";
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }).catch((error) => {
                console.log(error)
            });
    }

    render() {
        let { phoneNumber } = this.state;
        let { password } = this.state;

        return (
            <div className="container">
                <h3 className="login-heading mb-4">Đăng ký</h3>
                <Form className="form-register" inline
                    onSubmit={this.handleClick}
                >
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-4 form-group">
                        <Label for="phoneNumber" className="mr-sm-2">Số điện thoại</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Nhập số điện thoại của bạn ..."
                            value={phoneNumber}
                            onChange={this.onchangePhoneNumber}
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-4 form-group">
                        <Label for="examplePassword" className="mr-sm-2 ">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Nhập mật khẩu của bạn ..."
                            value={password}
                            onChange={this.onchangePassword}
                        />
                    </FormGroup>
                    <label></label>
                    <div id="recaptcha"></div>
                    <Input type="submit" value="Đăng ký" className="btn-register btn btn-primary" />
                </Form>
            </div>
        );
    }
}

export default register;
