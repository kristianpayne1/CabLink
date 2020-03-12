import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './Payment.css';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
 }

class Payment extends Component {

    constructor(pays) {
        super(pays);
        this.state = {
          GuestpaymentFormCardNo: null,
          GuestpaymentFormCardExp: null,
          GuestpaymentFormFirst: null,
          GuestpaymentFormLast: null,
          GuestpaymentFormAddress1: null,
          GuestpaymentFormAddress2: null,
          GuestpaymentFormTown: null,
          GuestpaymentFormCity: null,
          GuestpaymentFormPostCode: null,
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

          }
        };
      }     
    handleChange = (event) => {    
        
        event.preventDefault();
        const { name, value } = event.target;
        var validExPRegex = /\b\d{2}\W\d{2}\b/;
        let errors = this.state.errors;
        
        switch (name) {
          case 'GuestpaymentFormCardNo': 
            errors.GuestpaymentFormCardNo = 
              value.length < 16
                ? 'Card Number must be 16 digits long!'
                : '';
            break;
          case 'GuestpaymentFormCardExp': 
            errors.GuestpaymentFormCardExp = 
              validExPRegex.test(value)
                ? ''
                : 'Expiry date is not in a valid format!';
            break;
          case 'GuestpaymentFormFirst': 
            errors.GuestpaymentFormFirst = 
              value.length < 5
                ? 'First name must be atleast 5 characters long!'
                : '';
            break;
            case 'GuestpaymentFormLast': 
            errors.GuestpaymentFormLast = 
              value.length < 4
                ? 'Last name must be atleast 4 characters long!'
                : '';
            break;
            case 'GuestpaymentFormAddress1': 
            errors.GuestpaymentFormAddress1 = 
              value.length < 1
                ? 'Address is required!'
                : '';
            break;
            case 'GuestpaymentFormTown': 
            errors.GuestpaymentFormTown = 
              value.length < 4
                ? 'Town is required!'
                : '';
            break;
            case 'GuestpaymentFormCity': 
            errors.GuestpaymentFormCity = 
              value.length < 4
                ? 'City is required!'
                : '';
            break;      
            case 'GuestpaymentFormPostCode': 
            errors.GuestpaymentFormPostCode = 
              value.length < 5
                ? 'Post Code must be a minimum of 5 characters!'
                : '';
            break;          
          default:
            break;
        }
      
        this.setState({errors, [name]: value});
      }  
    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Form is Valid')
          this.paymentSuccess();
        }else{
          console.error('Form is invalid')
        }
    }    
    closeClicked = () => {
        this.props.handlePaymentShow(false);
    }

    paymentSuccess = () => {
        this.props.makeBooking();
    }

    render() {
        const {errors} = this.state;        
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
                <br/>
            </div>
        let processing = !(this.props.paymentFailed) ?
            <div>
                {paid}
            </div> :
            <div>
                <br />
                <h5>Payment failed</h5>
                <p>Please try again.</p>
            </div>
        let paymentForm = !(this.props.processingPayment) ?
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="GuestpaymentFormCardNo">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="cardNo" placeholder="Enter your card Number" name="GuestpaymentFormCardNo" onChange={this.handleChange}/>
                                        {errors.GuestpaymentFormCardNo.length > 0 && 
                                        <span className='error'>{errors.GuestpaymentFormCardNo}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="GuestpaymentFormCardExp">
                                        <Form.Label>Card Expiry (MM/YY)</Form.Label>
                                        <Form.Control type="cardExp" placeholder="MM/YY" name="GuestpaymentFormCardExp" onChange={this.handleChange}/>
                                        {errors.GuestpaymentFormCardExp.length > 0 && 
                                        <span className='error'>{errors.GuestpaymentFormCardExp}</span>}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Label>Billing Address</Form.Label>
                                <Form.Row>
                                        <Form.Group as={Col} controlId="GuestpaymentFormFirst">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="firstName" placeholder="First Name" name="GuestpaymentFormFirst" onChange={this.handleChange}/>
                                            {errors.GuestpaymentFormFirst.length > 0 && 
                                            <span className='error'>{errors.GuestpaymentFormFirst}</span>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="GuestpaymentFormLast">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="lastname" placeholder="Last Name" name="GuestpaymentFormLast" onChange={this.handleChange}/>
                                            {errors.GuestpaymentFormLast.length > 0 && 
                                            <span className='error'>{errors.GuestpaymentFormLast}</span>}
                                        </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="GuestpaymentFormAddress1">
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control type="address1" placeholder="First Line of Address" name="GuestpaymentFormAddress1" onChange={this.handleChange}/>
                                    {errors.GuestpaymentFormAddress1.length > 0 && 
                                    <span className='error'>{errors.GuestpaymentFormAddress1}</span>}
                                </Form.Group>
                                <Form.Group controlId="GuestpaymentFormAddress2">
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control type="address" placeholder="Second Line of Address" name="GuestpaymentFormAddress2"/>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="GuestpaymentFormTown">
                                        <Form.Label>Town</Form.Label>
                                        <Form.Control type="town" placeholder="Town" name="GuestpaymentFormTown" onChange={this.handleChange}/>
                                        {errors.GuestpaymentFormTown.length > 0 && 
                                        <span className='error'>{errors.GuestpaymentFormTown}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="GuestpaymentFormCity">
                                        <Form.Label>City/County</Form.Label>
                                        <Form.Control type="cityCounty" placeholder="City / County" name="GuestpaymentFormCity" onChange={this.handleChange}/>
                                        {errors.GuestpaymentFormCity.length > 0 && 
                                        <span className='error'>{errors.GuestpaymentFormCity}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="GuestpaymentFormPostCode">
                                        <Form.Label>PostCode</Form.Label>
                                        <Form.Control type="postCode" placeholder="PostCode" name="GuestpaymentFormPostCode" onChange={this.handleChange}/>
                                        {errors.GuestpaymentFormPostCode.length > 0 && 
                                        <span className='error'>{errors.GuestpaymentFormPostCode}</span>}
                                    </Form.Group>
                                </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={this.handleSubmit}>
                        Confirm payment
                    </Button>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </div> :
            <div style={{ 'textAlign': 'center' }}>
                {processing}
            </div>
        return (
            <Modal show={this.props.handleShow} onHide={this.closeClicked} centered backdrop="static">
                {paymentForm}
            </Modal>
        );
    }
}

export default Payment;
