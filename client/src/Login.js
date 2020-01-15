import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';

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
                            This is where login will go
                        </Tab>
                        <Tab eventKey="registration" title="Registration">
                            This is where registration will go
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
