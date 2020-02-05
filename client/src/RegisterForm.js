import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class RegisterForm extends Component {
    state = {
        validated : false,
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        userType: ''
    };

    handleSubmit = event => {
        event.preventDefault();       
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
    
        this.setState({validated: true});
    };

    handleRegister(){
        this.state.firstName = this.firstNameInput.current.value;
        this.state.lastName = this.lastNameInput.current.value;
        this.state.email = this.emailInput.current.value;
        this.state.mobile = this.mobileInput.current.value;
        this.state.password = this.passwordInput.current.value;
        this.state.userType = "Perm";
    };

    callAPI(firstName, lastName, email, mobile, password, userType){
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            mobile: this.state.mobile,
            userType: this.state.userType 
        };
        console.log(data);
        fetch("/user/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data == "success"){
                this.setState({msg: "Thanks for registering"});
            }
        }).catch(function(err) {
            console.log(err);
        });
    };

    render() {
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.mobileInput = React.createRef();
        this.passwordInput = React.createRef();
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group md="4" controlId="validationFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        ref={this.firstNameInput}
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
                        ref={this.lastNameInput}
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
                            ref={this.emailInput}
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
                        <Form.Control ref={this.mobileInput} type="text" placeholder="MobileNo" required />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid mobile number.
                    </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={this.passwordInput} type="password" placeholder="Password" required/>
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
