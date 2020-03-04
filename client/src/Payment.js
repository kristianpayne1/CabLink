import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
//import Tabs from 'react-bootstrap/Tabs';
//import Tab from 'react-bootstrap/Tab';

class Payment extends Component {

    closeClicked = () => {
        this.props.handlePaymentShow(false);
    }

    paymentSuccess = () => {
        this.props.makeBooking();
    }

    render() {
        let processing = !(this.props.paymentFailed) ?
            <div style={{ 'textAlign': 'center' }}>
                <br />
                <h5>Processing payment...</h5>
                <Spinner animation="border" variant="success" />
                <br /><br />
            </div> : 
            <div style={{ 'textAlign': 'center' }}>
                <br/>
                <h5>Payment failed due to error =(</h5>
                <p>Please try again.</p>
                <br/><br/>
            </div>
        let paymentForm = !(this.props.processingPayment) ?
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This is where payment stuff will be.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.paymentSuccess}>
                        Confirm payment
                    </Button>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </div> : {processing};
        return (
            <Modal show={this.props.handleShow} onHide={this.closeClicked} centered backdrop="static">
                {paymentForm}
            </Modal>
        );
    }
}

export default Payment;
