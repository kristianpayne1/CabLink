import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class NavBar extends Component {

    loginClicked = () => {
        this.props.handleShow();
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="#home">CabLink</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#booking">Booking</Nav.Link>
                        <Nav.Link href="#help">Help</Nav.Link>
                    </Nav>
                    <Button variant="outline-primary" onClick= {this.loginClicked}>Login</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;
