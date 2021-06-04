import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import home from "./components/home";
import login from "./components/login";
import register from "./components/register";
import forgetPassword from "./components/forget-password";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Route path="/" exact component={home} />
            <Route path="/login" component={login} />
            <Route path="/register" component={register} />
            <Route path="/forget-password" component={forgetPassword} />
          </div>
        </Router>
    );
  }
}

export default App;
