import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class PaymentForm extends Component {

    render() {
        return (
            <Accordion defaultActiveKey="5">
                <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5">
                            Enter a new Payment Method
                        </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="paymentFormName">
                                    <Form.Label>Card Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter your name as shown on the card"/>
                                </Form.Group>
                                
                                <Form.Row>
                                    <Form.Group as={Col} controlId="paymentFormCardNo">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="cardNo" placeholder="Enter your card Number"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="paymentFormCardExp">
                                        <Form.Label>Card Expiry (MM/YY)</Form.Label>
                                        <Form.Control type="cardExp" placeholder="MM/YY"/>
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
                                <Form.Row>
                                    <Form.Group as={Col} controlId="paymentFormTown">
                                        <Form.Label>Town</Form.Label>
                                        <Form.Control type="town" placeholder="Town"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="paymentFormCity">
                                        <Form.Label>City/County</Form.Label>
                                        <Form.Control type="cityCounty" placeholder="City / County"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="paymentFormPostCode">
                                        <Form.Label>PostCode</Form.Label>
                                        <Form.Control type="postCode" placeholder="PostCode"/>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="outline-primary" onClick={this.props.handleEditClose}>Submit</Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                            
                </Card>
            </Accordion>
        );
    }
}

export default PaymentForm;