import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './App.css';
import UserService from './services/UserService';
import AuthenService from './services/AuthenService';

class App extends Component {
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
       <h3 class="login-heading mb-4">Welcome back!</h3>
      <Form className="form-login" inline
        onSubmit={this.onSubmit}
      >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-4 form-group">
          <Label for="username" className="mr-sm-2">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onchangeUsername}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-4 form-group">
          <Label for="examplePassword" className="mr-sm-2 ">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onchangePassword}
          />
        </FormGroup>
        <Input type="submit" value="Login" className="btn-login btn btn-primary" />
      </Form>
    </div>
  }
}

export default App;
