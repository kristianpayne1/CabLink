import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import {Link } from "react-router-dom";

class NavBar extends Component {

    
    render() {
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
                                <Button variant="outline-primary" onClick={this.loginClicked}>Login</Button>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}

export default NavBar;
