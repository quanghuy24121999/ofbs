import { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import AuthenService from '../services/AuthenService';

class login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }

    this.onchangeUsername = this.onchangeUsername.bind(this);
    this.onchangePassword = this.onchangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onchangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onchangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    AuthenService.login(this.state.username, this.state.password);
  }

  render() {
    return <div className="container">
       <h3 className="login-heading mb-4">Đăng nhập</h3>
      <Form className="form-login" inline
        onSubmit={this.onSubmit}
      >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-4 form-group">
          <Label for="username" className="mr-sm-2">Số điện thoại</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Số điện thoại"
            value={this.state.username}
            onChange={this.onchangeUsername}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-4 form-group">
          <Label for="examplePassword" className="mr-sm-2 ">Mật khẩu</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Mật khẩu"
            value={this.state.password}
            onChange={this.onchangePassword}
          />
        </FormGroup>
        <Input type="submit" value="Đăng nhập" className="btn-login btn btn-primary" />
      </Form>
    </div>
  }
}

export default login;
