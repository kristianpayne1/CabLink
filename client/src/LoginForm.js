import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {
    state = {
        validated : false,
        users: [],
        userID: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        else{
            this.setState({validated: true});
            this.handleLogin();
        }
      };

    handleLogin() {
        let email = this.emailInput.current.value;
        let password = this.passwordInput.current.value;
        this.callAPI(email, password);
    };

    verifyLogin = (email, password) => {
      if (this.state.users[0].email === email && this.state.users[0].password === password) {
        this.setState({userID: this.state.users[0].userID}) ;
        console.log(this.state.userID);
      }
    }

    callAPI(email, password) {
        let self = this;
        console.log(email);
        fetch('http://localhost:5000/user/get/email/'+email, {
          method: 'GET'
        }).then(function (response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        }).then(function (data) {
          self.setState({ users: data });
          self.verifyLogin(email, password)
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={this.emailInput} type="email" placeholder="Enter email" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={this.passwordInput} type="password" placeholder="Password" required/>
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
