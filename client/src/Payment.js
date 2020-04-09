import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './Payment.css';

// validates payment is correct
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

// for when user is making payment to complete booking
class Payment extends Component {

    constructor(pays) {
        super(pays);
        this.state = {
            Paymentdetails: [],
            Billingaddress: [],
            GuestpaymentFormCardNo: null,
            GuestpaymentFormCardExp: null,
            GuestpaymentFormFirst: null,
            GuestpaymentFormLast: null,
            GuestpaymentFormAddress1: null,
            GuestpaymentFormAddress2: null,
            GuestpaymentFormTown: null,
            GuestpaymentFormCity: null,
            GuestpaymentFormPostCode: null,
            GuestpaymentFormCardCVV: null,
            GuestpaymentFormCardName: null,
            errors: {
                GuestpaymentFormCardNo: '',
                GuestpaymentFormCardExp: '',
                GuestpaymentFormFirst: '',
                GuestpaymentFormLast: '',
                GuestpaymentFormAddress1: '',
                GuestpaymentFormAddress2: '',
                GuestpaymentFormTown: '',
                GuestpaymentFormCity: '',
                GuestpaymentFormPostCode: '',
                GuestpaymentFormCardCVV: '',
                GuestpaymentFormCardName: '',

            }
        };
    }
    handleChange = (event) => {

        event.preventDefault();
        const { name, value } = event.target;
        var validExPRegex = /\b\d{2}[/]\d{2}\b/;
        var validcardnoRegex = /\b\d{16}\b/;
        var validnameinRegex = /\w+/;
        var validpostcodeRegex = /\b\w{2}\d{3}\w{2}|\b\w{1}\d{2}\w{2}|\b\w{1}\d{1}\w{1}\d{1}\w{2}/
        var validcvvRegex = /\b\d{3}\b/
        let errors = this.state.errors;

        switch (name) {
            case 'GuestpaymentFormCardNo':
                errors.GuestpaymentFormCardNo =
                    validcardnoRegex.test(value)
                        ? ''
                        : 'Card Number must be 16 digits long!';
                break;
            case 'GuestpaymentFormCardExp':
                errors.GuestpaymentFormCardExp =
                    validExPRegex.test(value)
                        ? ''
                        : 'Expiry date is not in a valid format!';
                break;
            case 'GuestpaymentFormFirst':
                errors.GuestpaymentFormFirst =
                    validnameinRegex.test(value)
                        ? ''
                        : 'First name must be atleast 2 characters long!';
                break;
            case 'GuestpaymentFormLast':
                errors.GuestpaymentFormLast =
                    validnameinRegex.test(value)
                        ? ''
                        : 'Last name must be atleast 2 characters long!';
                break;
            case 'GuestpaymentFormAddress1':
                errors.GuestpaymentFormAddress1 =
                    validnameinRegex.test(value)
                        ? ''
                        : 'Address is required!';
                break;
            case 'GuestpaymentFormTown':
                errors.GuestpaymentFormTown =
                    validnameinRegex.test(value)
                        ? ''
                        : 'Town is required!';
                break;
            case 'GuestpaymentFormCity':
                errors.GuestpaymentFormCity =
                    validnameinRegex.test(value)
                        ? ''
                        : 'City is required!';
                break;
            case 'GuestpaymentFormPostCode':
                errors.GuestpaymentFormPostCode =
                    validpostcodeRegex.test(value)
                        ? ''
                        : 'Post Code must be in the correct form with no spaces!';
                break;
            case 'GuestpaymentFormCardCVV':
                errors.GuestpaymentFormCardCVV =
                    validcvvRegex.test(value)
                        ? ''
                        : 'The CVV must be 3 digits long!'
                break;
            case 'GuestpaymentFormCardName':
                errors.GuestpaymentFormCardName =
                    validnameinRegex.test(value)
                        ? ''
                        : 'Cardholder name is required';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    // when the user clicked payment
    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Form is Valid')
            this.paymentSuccess();
        } else {
            console.error('Form is invalid')
        }
    }

    // close the payment modal
    closeClicked = () => {
        this.props.handlePaymentShow(false);
    }

    // if payment successful make booking
    paymentSuccess = () => {
        this.props.makeBooking();
    }

    getAccountID() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER + '/account/get/user/' + this.props.activeUser.userID, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            let accountID = data[0].accountID;
            self.getBankDetails(accountID);
        }).catch(err => {
            console.log('caught it!', err);
        });
    }

    getBankDetails(accountID) {
        console.log(this.props);
        let self = this;
        fetch(process.env.REACT_APP_SERVER + '/paymentdetails/get/' + accountID, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data.length > 0) {
                self.setState({ Paymentdetails: data[0] });
                let billingAddressID = data[0].billingAddressID
                self.getBillingAd(billingAddressID);
            }
        }).catch(err => {
            console.log('caught it!', err);
        });
    }

    getBillingAd(billingAddressID) {
        console.log(this.props);
        let self = this;
        fetch(process.env.REACT_APP_SERVER + '/billingAddress/get/' + billingAddressID, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            self.setState({ Billingaddress: data[0] });
        }).catch(err => {
            console.log('caught it!', err);
        });
    }
    componentDidMount() {

        if (this.props.loggedIn) {
            console.log(this.props);
            this.getAccountID()
        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.loggedIn !== prevProps.loggedIn) {
            if (this.props.loggedIn) {
                console.log("update" + this.props);
                this.getAccountID()
            }
        }
    }

    render() {
        console.log(this.state.Paymentdetails);
        const { errors } = this.state;
        // if not paid show form otherwise show proccessing payment 
        let paid = !(this.props.paymentSuccess) ?
            <div>
                <br />
                <h5>Processing payment...</h5>
                <Spinner animation="border" variant="success" />
                <br /><br />
            </div> :
            <div>
                <br />
                <h5>Payment successful</h5>
                <br />
            </div>
        let processing = !(this.props.paymentFailed) ?
            <div>
                {paid}
            </div> :
            <div>
                <br />
                <h5>Payment failed</h5>
                <p>Please try again.</p>
            </div>;
        let paymentForm = (this.state.Paymentdetails.length === 0) ?
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardNo">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="cardNo" placeholder="Enter your card Number" name="GuestpaymentFormCardNo" maxLength={16} onChange={this.handleChange} />
                            {errors.GuestpaymentFormCardNo.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardNo}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardExp">
                            <Form.Label>Card Expiry (MM/YY)</Form.Label>
                            <Form.Control type="cardExp" placeholder="MM/YY" name="GuestpaymentFormCardExp" onChange={this.handleChange} />
                            {errors.GuestpaymentFormCardExp.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardExp}</span>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardName">
                            <Form.Label>Cardholder Name</Form.Label>
                            <Form.Control type="cardName" placeholder="Cardholder Name" name="GuestpaymentFormCardName" onChange={this.handleChange} />
                            {errors.GuestpaymentFormCardName.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardName}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardCVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="cardCVV" placeholder="CVV" name="GuestpaymentFormCardCVV" maxLength={3} onChange={this.handleChange} />
                            {errors.GuestpaymentFormCardCVV.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardCVV}</span>}
                        </Form.Group>
                    </Form.Row>

                    <Form.Label>Billing Address</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormFirst">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="First Name" name="GuestpaymentFormFirst" onChange={this.handleChange} />
                            {errors.GuestpaymentFormFirst.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormFirst}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormLast">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastname" placeholder="Last Name" name="GuestpaymentFormLast" onChange={this.handleChange} />
                            {errors.GuestpaymentFormLast.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormLast}</span>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="GuestpaymentFormAddress1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="address1" placeholder="First Line of Address" name="GuestpaymentFormAddress1" onChange={this.handleChange} />
                        {errors.GuestpaymentFormAddress1.length > 0 &&
                            <span className='error'>{errors.GuestpaymentFormAddress1}</span>}
                    </Form.Group>
                    <Form.Group controlId="GuestpaymentFormAddress2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="address" placeholder="Second Line of Address" name="GuestpaymentFormAddress2" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormTown">
                            <Form.Label>Town</Form.Label>
                            <Form.Control type="town" placeholder="Town" name="GuestpaymentFormTown" onChange={this.handleChange} />
                            {errors.GuestpaymentFormTown.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormTown}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormCity">
                            <Form.Label>City/County</Form.Label>
                            <Form.Control type="cityCounty" placeholder="City / County" name="GuestpaymentFormCity" onChange={this.handleChange} />
                            {errors.GuestpaymentFormCity.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCity}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormPostCode">
                            <Form.Label>PostCode</Form.Label>
                            <Form.Control type="postCode" placeholder="PostCode" name="GuestpaymentFormPostCode" maxLength={7} onChange={this.handleChange} />
                            {errors.GuestpaymentFormPostCode.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormPostCode}</span>}
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.handleSubmit}>
                        Confirm Payment
                    </Button>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </div> : <div>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardNo">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="cardNo" placeholder="Enter your card Number" name="GuestpaymentFormCardNo" maxLength={16} onChange={this.handleChange} value={this.state.Paymentdetails.cardNo} readOnly />
                            {errors.GuestpaymentFormCardNo.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardNo}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardExp">
                            <Form.Label>Card Expiry (MM/YY)</Form.Label>
                            <Form.Control type="cardExp" placeholder="MM/YY" name="GuestpaymentFormCardExp" onChange={this.handleChange} value={this.state.Paymentdetails.cardExp} readOnly />
                            {errors.GuestpaymentFormCardExp.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardExp}</span>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardName">
                            <Form.Label>Cardholder Name</Form.Label>
                            <Form.Control type="cardName" placeholder="Cardholder Name" name="GuestpaymentFormCardName" onChange={this.handleChange} value={this.state.Paymentdetails.cardHolderName} readOnly />
                            {errors.GuestpaymentFormCardName.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardName}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormCardCVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="cardCVV" placeholder="CVV" name="GuestpaymentFormCardCVV" maxLength={3} onChange={this.handleChange} />
                            {errors.GuestpaymentFormCardCVV.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCardCVV}</span>}
                        </Form.Group>
                    </Form.Row>

                    <Form.Label>Billing Address</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormFirst">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" placeholder="First Name" name="GuestpaymentFormFirst" onChange={this.handleChange} value={this.state.Billingaddress.firstName} readOnly />
                            {errors.GuestpaymentFormFirst.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormFirst}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormLast">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastname" placeholder="Last Name" name="GuestpaymentFormLast" onChange={this.handleChange} value={this.state.Billingaddress.lastName} readOnly />
                            {errors.GuestpaymentFormLast.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormLast}</span>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="GuestpaymentFormAddress1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="address1" placeholder="First Line of Address" name="GuestpaymentFormAddress1" onChange={this.handleChange} value={this.state.Billingaddress.addressLine1} readOnly />
                        {errors.GuestpaymentFormAddress1.length > 0 &&
                            <span className='error'>{errors.GuestpaymentFormAddress1}</span>}
                    </Form.Group>
                    <Form.Group controlId="GuestpaymentFormAddress2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="address" placeholder="Second Line of Address" name="GuestpaymentFormAddress2" value={this.state.Billingaddress.addressLine2} readOnly />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GuestpaymentFormTown">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="city" placeholder="city" name="GuestpaymentFormTown" onChange={this.handleChange} value={this.state.Billingaddress.city} readOnly />
                            {errors.GuestpaymentFormTown.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormTown}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormCity">
                            <Form.Label>County</Form.Label>
                            <Form.Control type="County" placeholder="County" name="GuestpaymentFormCity" onChange={this.handleChange} value={this.state.Billingaddress.county} readOnly />
                            {errors.GuestpaymentFormCity.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormCity}</span>}
                        </Form.Group>
                        <Form.Group as={Col} controlId="GuestpaymentFormPostCode">
                            <Form.Label>PostCode</Form.Label>
                            <Form.Control type="postCode" placeholder="PostCode" name="GuestpaymentFormPostCode" onChange={this.handleChange} value={this.state.Billingaddress.postcode} readOnly />
                            {errors.GuestpaymentFormPostCode.length > 0 &&
                                <span className='error'>{errors.GuestpaymentFormPostCode}</span>}
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.handleSubmit}>
                        Confirm Payment
                    </Button>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </div>;
        let makePayment = !(this.props.processingPayment) ?
            paymentForm : <div style={{ 'textAlign': 'center' }}>
                {processing}
            </div>;
        return (
            <Modal show={this.props.handleShow} onHide={this.closeClicked} centered backdrop="static">
                {makePayment}
            </Modal>

        );
    }
}


export default Payment;