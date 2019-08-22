import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import MessagePage from './Components/MessagePage'

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount(){
    //test to see if server connects
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(){
    //test to see if server connects
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(`/get`);
    const body = await response.json();

    //if (response.status !== 200) throw Error(response.message);
      return body;
  };

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>{this.state.response} users</div>
      </header>

      <MessagePage></MessagePage>
    </div>
  );
  }
}

export default App;
