import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class NavBar extends Component {

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">CabLink</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#booking">Booking</Nav.Link>
                    <Nav.Link href="#help">Help</Nav.Link>
                </Nav>
                    <Button variant="outline-primary">Login</Button>
            </Navbar>
        );
    }
}

export default NavBar;
