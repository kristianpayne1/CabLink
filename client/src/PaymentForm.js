import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

// Payment form
class PaymentForm extends Component {

    state = {
        submitted: false
    }

    // gets all the input data and calls database to update
    submitBankDetails = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.stopPropagation();
        } else {
            let cardName = this.cardNameInput.current.value;
            let cardNo = this.cardNoInput.current.value;
            let cardExp = this.cardExpInput.current.value;
            let firstName = this.firstNameInput.current.value;
            let lastName = this.lastNameInput.current.value;
            let addressLine1 = this.addressLine1Input.current.value;
            let addressLine2 = this.addressLine2Input.current.value;
            let city = this.cityInput.current.value;
            let county = this.countyInput.current.value;
            let postcode = this.postCodeInput.current.value;

            this.callAPI(cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode);
        }
    };

    // updates the database of the new billing address 
    callAPI(cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode){
        let billingData = {cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode};
        let self = this;
        fetch(process.env.REACT_APP_SERVER+"/billingaddress/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(billingData)
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            // when successful get account
            console.log(data)
            if(data.serverStatus === 2){
                console.log('Success');
                self.setState({submitted: true});
                console.log(data);
                let billingAddressID = data.insertId;
                self.getAccountID(billingAddressID, cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode);
            }
        }).catch(function(err) {
            console.log(err)
        });
    };

    // get account details of specified user account
    getAccountID(billingAddressID, cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+'/account/get/user/'+this.props.activeUser.userID, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
            // if retreival successful create new payment details
            console.log(data);
            let accountID = data[0].accountID;
            self.finishAPI(accountID, billingAddressID, cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode);
        }).catch(err => {
          console.log('caught it!', err);
        });
    }

    // create new payment details for specified user account
    finishAPI(accountID, billingAddressID, cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode){
        let paymentData = {accountID, billingAddressID, cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode};
        let self = this;
        fetch(process.env.REACT_APP_SERVER+"/paymentdetails/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(paymentData)
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if(data.serverStatus === 2){
                // if successsful set submitted to true
                console.log('Success');
                self.setState({submitted: true});
                console.log(data);
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    render() {
        // Form references
        this.cardNameInput = React.createRef();
        this.cardNoInput = React.createRef();
        this.cardExpInput = React.createRef();
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.addressLine1Input = React.createRef();
        this.addressLine2Input = React.createRef();
        this.cityInput = React.createRef();
        this.countyInput = React.createRef();
        this.postCodeInput = React.createRef();
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
                                    <Form.Control type="name" ref={this.cardNameInput} placeholder="Cardholder Name"/>
                                </Form.Group>
                                
                                <Form.Row>
                                    <Form.Group as={Col} controlId="paymentFormCardNo">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="cardNo" ref={this.cardNoInput} placeholder="Enter your Card Number"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="paymentFormCardExp">
                                        <Form.Label>Card Expiry (MM/YY)</Form.Label>
                                        <Form.Control type="cardExp" ref={this.cardExpInput} placeholder="MM/YY"/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Label>Billing Address</Form.Label>
                                <Form.Row>
                                        <Form.Group as={Col} controlId="paymentFormFirst">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="firstName" ref={this.firstNameInput} placeholder="First Name"/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="paymentFormLast">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="lastname" ref={this.lastNameInput} placeholder="Last Name"/>
                                        </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="paymentFormAddress1">
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control type="address1" ref={this.addressLine1Input} placeholder="Address Line 1"/>
                                </Form.Group>
                                <Form.Group controlId="paymentFormAddress2">
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control type="address2" ref={this.addressLine2Input} placeholder="Address Line 2"/>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="paymentFormTown">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="town" ref={this.cityInput} placeholder="City"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="paymentFormCity">
                                        <Form.Label>County</Form.Label>
                                        <Form.Control type="cityCounty" ref={this.countyInput} placeholder="County"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="paymentFormPostCode">
                                        <Form.Label>PostCode</Form.Label>
                                        <Form.Control type="postCode" ref={this.postCodeInput} placeholder="Postal Code"/>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="outline-primary" onClick={this.submitBankDetails}>Submit</Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                            
                </Card>
            </Accordion>
        );
    }
}

export default PaymentForm;