import React, { Component } from 'react';
import './App.css';
// import all components needed for app
import Booking from './Booking.js';
import Home from './Home.js';
import Help from './Help.js';
import NavBar from './NavBar.js';
import Login from './Login.js';
import Account from './Account.js';
import DriverPickup from './DriverPickup.js'
// for application routing
import { Route } from "react-router-dom";

class App extends Component {

  state = {
    showModal: false,
    showAccount: false,
    activeUser: [],
    loggedIn: false,
    eventKey: 1,
    editClicked: false
  };

  // show login modal
  handleLoginShow() {
    this.setState({ showModal: true });
  }

  // close login modal
  handleLoginClose() {
    this.setState({ showModal: false });
  }

  // shows account and display selected view (Payment details, Account info, billing addresses etc.)
  handleAccountShow(eventKey) {
    this.setState({ showAccount: true, eventKey: eventKey });
    console.log(this.state.showAccount);
  }

  // closes account modal
  handleAccountClose() {
    this.setState({ showAccount: false });
  }

  // sets active user when login/registration complete
  handleLoginComplete = (activeUser, loggedIn) => {
    this.setState({ activeUser: activeUser, loggedIn: loggedIn });
  };

  // logs out user
  handleLogoutComplete() {
    this.setState({ activeUser: [], loggedIn: false});
  }

  // allows editing of user account 
  handleEditShow() {
    this.setState({ editClicked: true });
  }

  // disables editing of user account
  handleEditClose() {
    this.setState({ editClicked: false });
  }


  render() {
    return (
      <div>
        <NavBar handleShow={this.handleLoginShow.bind(this)} loggedIn={this.state.loggedIn} activeUser={this.state.activeUser} handleAccountShow={this.handleAccountShow.bind(this)} handleLogoutComplete={this.handleLogoutComplete.bind(this)} />
        <Login handleShow={this.state.showModal} handleLoginClose={this.handleLoginClose.bind(this)} handleLoginComplete={this.handleLoginComplete} />
        <Account handleAccount={this.state.showAccount} handleAccountClose={this.handleAccountClose.bind(this)} activeUser={this.state.activeUser} eventKey={this.state.eventKey} editClicked={this.state.editClicked} handleEditShow={this.handleEditShow.bind(this)} handleEditClose={this.handleEditClose.bind(this)} />
        <div className="content">
          <Route exact path="/proj/co600/project/c37_cablink/" component={Home} />
          <Route path="/proj/co600/project/c37_cablink/booking" component={Booking} activeUser={this.props.activeUser} />
          <Route path="/proj/co600/project/c37_cablink/help" component={Help} />
          <Route path="/proj/co600/project/c37_cablink/pickup/:id" render={(props) => <DriverPickup {...props} />} />
        </div>
      </div>
    );
  }
}

export default App;
