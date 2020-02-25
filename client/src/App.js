import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Booking from './Booking.js';
import Home from './Home.js';
import Help from './Help.js';
import NavBar from './NavBar.js';
import Login from './Login.js';
import Account from './Account.js';
import { Route } from "react-router-dom";

class App extends Component {

  state = {
    showModal: false,
    showAccount: false,
    activeUser: [],
    loggedIn: false
  };

  handleLoginShow() {
    this.setState({ showModal: true });
  }

  handleLoginClose() {
    this.setState({ showModal: false });
  }

  handleAccountShow() {
    this.setState({ showAccount: true });
    console.log(this.state.showAccount);
  }

  handleAccountClose() {
    this.setState({ showAccount: false });
  }

  handleLoginComplete = (activeUser) => {
    this.setState({ activeUser: activeUser, loggedIn: true });
    console.log(this.state.activeUser);
  };



  render() {
    return (
      <div>
        <NavBar handleShow={this.handleLoginShow.bind(this)} loggedIn={this.state.loggedIn} activeUser={this.state.activeUser} handleAccountShow={this.handleAccountShow.bind(this)}/>
        <Login handleShow={this.state.showModal} handleLoginClose={this.handleLoginClose.bind(this)} handleLoginComplete={this.handleLoginComplete}/>
        <Account handleAccount={this.state.showAccount} handleAccountClose={this.handleLoginClose.bind(this)}/>
        <div className="content">
          <Route exact path="/proj/co600/project/c37_cablink/" component={Home} />
          <Route path="/proj/co600/project/c37_cablink/booking" component={Booking} />
          <Route path="/proj/co600/project/c37_cablink/help" component={Help} />
        </div>
      </div>
    );
  }
}

export default App;
