import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class RegisterForm extends Component {
    state = {
        validated : false,
    };

    handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        this.setState({validated: true});
      };

    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group md="4" controlId="validationFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid firstname.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid last name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="validationMobile">
                    <Form.Label>Mobile number</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">+44</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="MobileNo" required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid mobile number.
                    </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPasswordConfirm">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required/>
                    <Form.Control.Feedback type="invalid">
                        The confirmation password does not match.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>
                <Button type="submit">Submit form</Button>
            </Form>
        );
    }
}

export default RegisterForm;
