import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import Tabs from 'react-bootstrap/Tabs';
//import Tab from 'react-bootstrap/Tab';

class Payment extends Component {

    closeClicked = () => {
        this.props.handlePaymentShow(false);
    }

    render() {
        return (
            <Modal show={this.props.handleShow} onHide={this.closeClicked} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This is where payment stuff will be.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.closeClicked}>
                        Confirm payment
                    </Button>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Payment;
