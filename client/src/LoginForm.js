import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./LoginForm.css";
import hash from 'object-hash';

// Form to allow user to login
class LoginForm extends Component {
    state = {
        validated : false,
        users: [],
        userID: ''
    };

    // when login button clicked check if valid and submit
    handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        else{
            this.handleLogin();
        }
      };

    // get values of email and password 
    handleLogin() {
        let emailI = this.emailInput.current.value;
        let password = hash.sha1(this.passwordInput.current.value);
        console.log(password);
        this.callAPI(emailI, password);
    };

    // verfies if the provided details match details from database
    verifyLogin = (emailI, password) => {
      let userEmail = this.state.users[0].email;
      let userPassword = this.state.users[0].password;
      if (userEmail === emailI && userPassword === password) {
        this.setState({userID: this.state.users[0].userID}) ;
        this.setState({validated: true});
        console.log(this.state.userID);
        return true;
      } else {
        return false;
      }
    }

    // calls the database for the user's details with provided email
    callAPI(emailI, password) {
        let self = this;
        console.log(emailI);
        fetch(process.env.REACT_APP_SERVER+'/user/get/email/'+emailI, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
          self.setState({users: data });
          if(self.verifyLogin(emailI, password)){
            console.log(self.state.users);
            let userID = self.state.users[0].userID;
            let firstname = self.state.users[0].firstname;
            let lastname = self.state.users[0].lastname;
            let email = self.state.users[0].email;
            let mobileNo = self.state.users[0].mobileNo;
            let userType = self.state.users[0].userType;
            var activeUser = {userID, firstname, lastname, email, mobileNo, userType};
            self.props.handleLoginComplete(activeUser, true);
            self.props.closeClicked();
          } 
        }).catch(err => {
          console.log('caught it!', err);
        })
      };

    render() {
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control ref={this.emailInput} type="email" placeholder="Email Address" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control ref={this.passwordInput} type="password" placeholder="Password" isInvalid={this.state.validated} required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid password.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Never share your account password with anyone.
                     </Form.Text>
                </Form.Group>
                <Form.Group controlId="formRememberCheck">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
