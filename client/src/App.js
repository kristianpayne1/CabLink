import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Booking from './Booking.js';
import Home from './Home.js';
import Help from './Help.js';
import NavBar from './NavBar.js';
import Login from './Login.js';
import { Route } from "react-router-dom";

class App extends Component {

  state = {
    showModal: false
  };

  handleLoginShow() {
    this.setState({ showModal: true });
  }

  handleLoginClose() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <NavBar handleShow={this.handleLoginShow.bind(this)} />
        <Login handleShow={this.state.showModal} handleLoginClose={this.handleLoginClose.bind(this)} />
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/booking" component={Booking} />
          <Route path="/help" component={Help} />
        </div>
      </div>
    );
  }
}

export default App;
