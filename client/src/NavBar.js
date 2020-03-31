import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

// Navigation bar 
class NavBar extends Component {
  state = {
    collapsed: false,
  }

  // when login is clicked show login modal
  loginClicked = () => {
    this.navbarClosed();
    this.props.handleShow();
  }

  // when account button clicked show account
  accountClicked = (eventKey) => {
    this.navbarClosed();
    this.props.handleAccountShow(eventKey);
  }

  navbarClosed = () => {
    this.setState({collapsed: false});
  }

  navbarToggle = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    // if user isn't logged in show login button otherwise show account button
    let showLoginButton = this.props.loggedIn ? <div style={{ float: "right" }}>
      <ButtonToolbar>
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            alignRight
            title="Account"
            variant="outline-primary"
            id={`dropdown-button-drop-${idx}`}
            key={idx}
          >
            <Dropdown.Item eventKey="1" onClick={() => this.accountClicked(1)}>View Account</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => this.accountClicked(2)}>Change Payment Details</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => this.accountClicked(3)}>Check Recent Bookings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={() => this.props.handleLogoutComplete()}>Logout</Dropdown.Item>
          </DropdownType>
        ))}
      </ButtonToolbar>
    </div>
      : <div style={{ float: "right" }}><Button variant="outline-primary" onClick={this.loginClicked}>Login</Button></div>;

    //let showUserFirstname = this.props.loggedIn ? <p classWelcome="loginWelcome">Welcome, {this.props.activeUser.activeUser[0].firstname}</p> : null;

    return (
      <div>
        <div>
          <Navbar expanded={this.state.collapsed} expand="lg" bg="light" variant="light">
            <Navbar.Brand onClick={this.navbarClosed} as={Link} to="/proj/co600/project/c37_cablink/">
              <img
                src={require('./images/logo.png')}
                width="80"
                height="30"
                className="d-inline-block align-top"
                alt="Cablink"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={this.navbarToggle}/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={this.navbarClosed} as={Link} to="/proj/co600/project/c37_cablink/">Home</Nav.Link>
                <Nav.Link onClick={this.navbarClosed} as={Link} to="/proj/co600/project/c37_cablink/booking">Booking</Nav.Link>
                <Nav.Link onClick={this.navbarClosed} as={Link} to="/proj/co600/project/c37_cablink/help">Help</Nav.Link>
              </Nav>
              <div className="text-center">
                {showLoginButton}
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default NavBar;
