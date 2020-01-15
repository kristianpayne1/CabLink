import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class LoginModal extends Component {

    closeClicked = () => {
        this.props.handleLoginClose();
    }

    render() {
        return (
            <Modal show={this.props.handleShow} onHide={this.closeClicked} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>This is where account login and registration will go</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginModal;
