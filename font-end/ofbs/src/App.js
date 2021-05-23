import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import TopMenu from "./components/topMenu";
import home from "./components/home";
import login from "./components/login";
import register from "./components/register";
class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <TopMenu />

            <Route path="/" exact component={home} />
            <Route path="/login" component={login} />
            <Route path="/register" component={register} />
          </div>
        </Router>
    );
  }
}

export default App;
