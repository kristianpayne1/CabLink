import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';

class Login extends Component {

    closeClicked = () => {
        this.props.handleLoginClose();
    }

    render() {
        return (
            <Modal show={this.props.handleShow} onHide={this.closeClicked} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" fill>
                        <Tab eventKey="login" title="Login">
                            <LoginForm handleLoginComplete={this.props.handleLoginComplete}/>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <RegisterForm handleLoginComplete={this.props.handleLoginComplete}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Login;
