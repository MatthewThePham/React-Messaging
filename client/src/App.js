import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import RootPage from './Components/RootPage'

/**
 
<h5 style={{textAlign:"left"}}>
  1. Enter a unique room ID (can be combination of letters or numbers)
  2. Select your Username
  3. Chat away with people in same room ID!
</h5>

 **/

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount(){
    //test to see if server connects and shows total users
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(){
    //updates the total users
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(`/getTotalUsers`);
    const body = await response.json();

    //if (response.status !== 200) throw Error(response.message);
      return body;
  };

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <div >

          <h1>
            Messaging App
          </h1>

          <h6 style={{marginTop:"-5%"}}>   
            React, Express, Socket-io
          </h6>

          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <h3 >{this.state.response} users</h3>
      </header>

      <RootPage></RootPage>
    </div>
  );
  }
}

export default App;
