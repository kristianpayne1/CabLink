import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class PaymentForm extends Component {

    render() {
        
        
        return (
            <Form>
                <Form.Group controlId="paymentFormName">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter your name as shown on the card"/>
                </Form.Group>
                <Form.Group controlId="paymentFormCardNo">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="cardNo" placeholder="Enter your card Number"/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="paymentFormCardExp">
                        <Form.Label>Card Expiry (MM/YY)</Form.Label>
                        <Form.Control type="cardExp" placeholder="MM/YY"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="paymentFormCSC">
                        <Form.Label>Card Security Code (CSC/CVC)</Form.Label>
                        <Form.Control type="cardCSC" placeholder="000"/>
                    </Form.Group>
                </Form.Row>

                <Form.Label>Billing Address</Form.Label>
                <Form.Row>
                        <Form.Group as={Col} controlId="paymentFormFirst">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="First Name"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="paymentFormLast">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastname" placeholder="Last Name"/>
                        </Form.Group>
                </Form.Row>
                <Form.Group controlId="paymentFormAddress1">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control type="address1" placeholder="First Line of Address"/>
                </Form.Group>
                <Form.Group controlId="paymentFormAddress2">
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control type="address" placeholder="Second Line of Address"/>
                </Form.Group>
            </Form>
        );
    }
}

export default PaymentForm;