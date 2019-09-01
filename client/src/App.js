import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import RootPage from './Components/RootPage'

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
        <div>

          <h1 style={{marginTop:"-20%"}}>
            Messaging App
          </h1>

          <h6 style={{marginTop:"-5%"}}>   
            React, Express, Socket-io
          </h6>

          <img src={logo} className="App-logo" alt="logo" />

          <h5 style={{textAlign:"left"}}>
            1. Enter a unique room ID (letters or numbers)
            <br/>
            2. Select your username
            <br/>
            3. Chat away with people in same room ID!
          </h5>
        </div>

        <h3 style={{marginBottom:"-5%"}}>{this.state.response} users</h3>
      </header>

      <RootPage></RootPage>
    </div>
  );
  }
}

export default App;
