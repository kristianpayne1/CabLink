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
    showModal: false,
    activeUser: [],
    loggedIn: false
  };

  handleLoginShow() {
    this.setState({ showModal: true });
  }

  handleLoginClose() {
    this.setState({ showModal: false });
  }

  handleLoginComplete = (activeUser) => {
      this.setState({activeUser: activeUser});
      console.log(this.state.activeUser);
  };

  render() {
    return (
      <div>
        <NavBar handleShow={this.handleLoginShow.bind(this)} />
        <Login handleShow={this.state.showModal} handleLoginClose={this.handleLoginClose.bind(this)} handleLoginComplete={this.handleLoginComplete}/>
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
