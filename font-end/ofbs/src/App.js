import { Component } from 'react';
import './App.css';

import axios from 'axios';
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/user',
      data: null
    }).then(res => {
      this.setState({
        users: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { users } = this.state;

    return <div>
      <h2>List</h2>
        {users.map(user => {
          return <h2>{user.name}</h2>
        })}
    </div>
  }
}

export default App;
