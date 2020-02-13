import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class RegisterForm extends Component {
    state = {
        validated: false,
        registered: '',
        dataSet: {
            firstname: '',
            lastName: '',
            regEmail: '',
            mobileNo: '',
            regPassword: '',
            userType: '',
            userID: '',
            lastLogin: ''
        },
    };

    handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            this.setState({validated: true});
            this.handleRegister();
        }
      };

    handleRegister() {
        this.setState({dataSet:{
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            regEmail: this.regEmailInput.current.value,
            mobileNo: "+44" + this.mobileInput.current.value,
            regPassword: this.regPasswordInput.current.value,
            userType: "Perm",
            userID: '',
            lastLogin: ''
        }});
        console.log(this.state.dataSet);
        //this.callAPI();
    };

    callAPI(){
        // Put registered user data into User table
        fetch("http://localhost:5000/users/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.dataSet)
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if(data === "success"){
                this.setState({registered: "Registration complete!"});
                this.fetchID();
            }
        }).catch(function(err) {
            console.log(err)
        });
    };

    fetchID() {
        // Get the userID using user email
        fetch('http://localhost:5000/user/get/id/'+this.state.dataSet.regEmail, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
            this.setState({dataSet: {userID : data[0].userID}});
            this.createNewAccount();
        }).catch(err => {
          console.log('caught it!', err);
        });
    }

    createNewAccount() {
        // Put registered user account into Account table
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        this.setState({dataSet: {lastLogin: dateTime}});

        fetch("http://localhost:5000/account/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.dataSet)
        }).then(function(response) {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if(data === "success"){
                this.setState({registered: "Registration complete!"});
            }
        }).catch(function(err) {
            console.log(err)
        });

        var activeUser = this.state.dataSet;
        this.props.handleLoginComplete({activeUser: activeUser, loggedIn: true});
    }

    render() {
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.regEmailInput = React.createRef();
        this.mobileInput = React.createRef();
        this.regPasswordInput = React.createRef();
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
                            ref={this.regEmailInput}
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
                    <Form.Control ref={this.regPasswordInput} type="password" placeholder="Password" required/>
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
