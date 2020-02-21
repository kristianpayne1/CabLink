import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link } from "react-router-dom";

class NavBar extends Component {
    
    loginClicked = () => {
        this.props.handleShow();
    }

    render() {
        let showLoginButton = this.props.loggedIn ? <>
        <ButtonToolbar>
          {[DropdownButton].map((DropdownType, idx) => (
            <DropdownType
              alignRight
              title="Account"
              variant="outline-primary"
              id={`dropdown-button-drop-${idx}`}
              key={idx}
            >
              <Dropdown.Item eventKey="1">View Account</Dropdown.Item>
              <Dropdown.Item eventKey="2">Change Payment Details</Dropdown.Item>
              <Dropdown.Item eventKey="3">Check Recent Bookings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Logout</Dropdown.Item>
            </DropdownType>
          ))}
        </ButtonToolbar>
      </>
        : <Button variant="outline-primary" onClick={this.loginClicked}>Login</Button> ;

        //let showUserFirstname = this.props.loggedIn ? <p classWelcome="loginWelcome">Welcome, {this.props.activeUser.activeUser[0].firstname}</p> : null;
                            
        return (
            <div>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                        <Navbar.Brand as={Link} to="/">CabLink</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/booking">Booking</Nav.Link>
                                <Nav.Link as={Link} to="/help">Help</Nav.Link>
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
