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
        submitted: false,
        paymentDetails: [],
        accountID: [],
        paymentCards: [],
        newPaymentInformation: []
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
            if(data.serverStatus === 2){
                self.setState({submitted: true});
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
            let accountID = data[0].accountID;
            self.setState({accountID: accountID});
            self.finishAPI(accountID, billingAddressID, cardName, cardNo, cardExp, firstName, lastName, addressLine1, addressLine2, city, county, postcode);
        }).catch(err => {
          console.log('caught it!', err);
        });
    }

    getAccountIDNoParam(){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+'/account/get/user/'+this.props.activeUser.userID, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
            self.setState({accountID: data[0].accountID});
            let accountID = data[0].accountID;
            self.getPaymentDetails(accountID);
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
            if(data.serverStatus === 2){
                // if successsful set submitted to true
                self.setState({submitted: true});
                self.getAccountIDNoParam();
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    getPaymentDetails(accountID){
        if(accountID !== null){
            let self = this;
            fetch(process.env.REACT_APP_SERVER+"/paymentdetails/get/" + accountID, {
                method: 'GET'
            }).then(function(response) {
                if(response.status >= 400){
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({paymentDetails: data})
                self.getBillingAddress(accountID);
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    getBillingAddress(accountID){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+"/billingaddress/get", {
            method: 'GET'
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({billingAddressData: data});
            self.loadPaymentDetails(accountID);
        })
    }
    
    deletePaymentDetails(e){
        let accountID = e.target.getAttribute("accountid");
        let billingAddressID = e.target.getAttribute("billingaddressid");
        if(accountID !== null){
            let self = this;
            fetch(process.env.REACT_APP_SERVER+"/paymentdetails/delete/" + accountID + "/" + billingAddressID, {
                method: 'GET'
            }).then(function(response) {
                if(response.status >= 400){
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.deleteBillingAddress(billingAddressID);
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    deleteBillingAddress(billingAddressID){
        let self = this;
        fetch(process.env.REACT_APP_SERVER+"/billingaddress/delete/" + billingAddressID, {
            method: 'GET'
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.getAccountIDNoParam();
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    loadPaymentDetails(accountID){
        let paymentCards = [];
        if(this.state.paymentDetails !== null){
            if(this.state.paymentDetails.length === 0){
                paymentCards.push(<Card key={0}>
                    <Accordion.Toggle as={Card.Header} eventKey={0}>
                        No Card Details Found
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={0}>
                        <Card.Body>
                            No Card details were found. Add some!
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>);
                this.setState({paymentCards: paymentCards});
            } else {
                for(let x = 0; x < this.state.paymentDetails.length; x++){
                    let billingAddressID = this.state.paymentDetails[x].billingAddressID;
                    let billingAddress = [];
                    for(let y = 0; y < this.state.billingAddressData.length; y++){
                        if(billingAddressID === this.state.billingAddressData[y].billingAddressID){
                            billingAddress = this.state.billingAddressData[y];
                        }
                    }
                    paymentCards.push(<Card key={x}>
                        <Accordion.Toggle as={Card.Header} eventKey={x}>
                            {this.state.paymentDetails[x].cardHolderName}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={x}>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="paymentFormName">
                                        <Form.Label>Card Name</Form.Label>
                                        <Form.Control readOnly type="name" placeholder={this.state.paymentDetails[x].cardHolderName}/>
                                    </Form.Group>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="paymentFormCardNo">
                                            <Form.Label>Card Number</Form.Label>
                                            <Form.Control readOnly type="cardNo" placeholder={this.state.paymentDetails[x].cardNo}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="paymentFormCardExp">
                                            <Form.Label>Card Expiry (MM/YY)</Form.Label>
                                            <Form.Control readOnly type="cardExp" placeholder={this.state.paymentDetails[x].cardExp}/>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Label>Billing Address</Form.Label>
                                    <Form.Row>
                                            <Form.Group as={Col} controlId="paymentFormFirst">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control readOnly type="firstName" placeholder={billingAddress.firstName}/>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="paymentFormLast">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control readOnly type="lastname" placeholder={billingAddress.lastName}/>
                                            </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="paymentFormAddress1">
                                        <Form.Label>Address Line 1</Form.Label>
                                        <Form.Control readOnly type="address1" placeholder={billingAddress.addressLine1}/>
                                    </Form.Group>
                                    <Form.Group controlId="paymentFormAddress2">
                                        <Form.Label>Address Line 2</Form.Label>
                                        <Form.Control readOnly type="address2" placeholder={billingAddress.addressLine2}/>
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="paymentFormTown">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control readOnly type="town" placeholder={billingAddress.city}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="paymentFormCity">
                                            <Form.Label>County</Form.Label>
                                            <Form.Control readOnly type="cityCounty" placeholder={billingAddress.county}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="paymentFormPostCode">
                                            <Form.Label>PostCode</Form.Label>
                                            <Form.Control readOnly type="postCode" placeholder={billingAddress.postcode}/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="outline-danger" billingaddressid={billingAddressID} accountid={accountID} onClick={this.deletePaymentDetails.bind(this)}>Delete</Button>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>);
                }
                this.setState({paymentCards: paymentCards});
            }
        } else {
            paymentCards.push(<Card key={0}>
                <Accordion.Toggle as={Card.Header} eventKey={0}>
                    No Card Details Found
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={0}>
                    <Card.Body>
                        No Card details were found. Add some!
                    </Card.Body>
                </Accordion.Collapse>
            </Card>);
            this.setState({paymentCards: paymentCards});
        }
        this.renderNewPaymentForm();
    }

    renderNewPaymentForm(){
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
        let newPaymentInformation = <Card key={3}>
            <Accordion.Toggle as={Card.Header} eventKey={3}>
                Enter a new Payment Method
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={3}>
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

        this.setState({newPaymentInformation: newPaymentInformation});
    }

    componentDidMount(){
        this.getAccountIDNoParam();
        
    }

    render() {
        let paymentCards = this.state.paymentCards;
        let newPaymentInformation = this.state.newPaymentInformation;   
        if(this.state.paymentCards.length >= 3){
            newPaymentInformation = [];
        }
        return (
            <div style={{'maxHeight': '64vh', 'overflowY': 'auto'}}>
                <Accordion defaultActiveKey={0}>
                    {paymentCards}
                    {newPaymentInformation}
                </Accordion>
            </div>
        );
    }
}

export default PaymentForm;