import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import GoogleMap from './map.js';
import NavBar from './NavBar.js';
import Login from './Login.js';

class App extends Component {

  state = {
    showModal : false,
  };
  
  handleLoginShow() {
    this.setState({showModal : true});
  }

  handleLoginClose() {
    this.setState({showModal : false});
  }
 
  render() {
    return (
      <div>
        <NavBar handleShow={this.handleLoginShow.bind(this)}/>
        <Login handleShow={this.state.showModal} handleLoginClose={this.handleLoginClose.bind(this)}/>
        <GoogleMap/>
      </div>
    );
  }
}
 
export default App;
