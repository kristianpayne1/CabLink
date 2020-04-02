import React, { Component } from 'react';
// react components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import hash from 'object-hash';

// View account details
class AccountForm extends Component {
    state = {
        emailClicked: false,
        passwordClicked: false
    }

    handleEditSubmit = event => {
        event.preventDefault();
        if (this.emailInput.current !== null){
            let email = this.emailInput.current.value;
            this.updateEmail(email);
        } 
        if (this.emailInput.current !== null){
            let password = hash.sha1(this.passwordInput.current.value);
            this.updatePassword(password);
        }
        //this.props.handleEditClose();
    }

    emailEditClicked = () => {
        if(this.state.emailClicked === false){
            this.setState({emailClicked: true});
        } else {
            this.setState({emailClicked: false});
        }
    }

    emailSubmitClicked = () => {
        if(this.emailInput.current != null){
            let email = this.emailInput.current.value;
            this.updateEmail(email);
            this.emailEditClicked();
        }
    }

    passwordEditClicked = () => {
        if(this.state.passwordClicked === false){
            this.setState({passwordClicked: true});
        } else {
            this.setState({passwordClicked: false});
        }
    }

    passwordSubmitClicked = () => {
        if(this.passwordInput.current != null){
            let password = hash.sha1(this.passwordInput.current.value);
            this.updatePassword(password);
            this.passwordEditClicked();
        }
    }

    updatePassword(password){
        if(password !== this.props.activeUser.password){
            let passwordData = {password};
            let self = this;
            fetch(process.env.REACT_APP_SERVER+"/user/update/password/"+self.props.activeUser.userID, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(passwordData)
            }).then(function(response) {
                if(response.status >= 400){
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(data) {
                console.log(data)
                if(data.serverStatus === 2){
                    console.log('Success');
                }
            }).catch(function(err) {
                console.log(err)
            });
        } else {
            console.log("Password didn't change");
        }
    }

    updateEmail(email){
        if(email !== this.props.activeUser.email){
            let emailData = {email};
            let self = this;
            fetch(process.env.REACT_APP_SERVER+"/user/update/email/"+self.props.activeUser.userID, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(emailData)
            }).then(function(response) {
                if(response.status >= 400){
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function(data) {
                console.log(data)
                if(data.serverStatus === 2){
                    console.log('Success');
                }
            }).catch(function(err) {
                console.log(err)
            });
        } else {
            console.log("Email didn't change");
        }
    }

    render() {
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        let email = this.state.emailClicked ? <>
            <label>Email Address</label>
            <InputGroup classname="email">
                <Form.Group>
                    <Form.Control type="email" ref={this.emailInput} placeholder={this.props.activeUser.email} />
                </Form.Group>
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.emailSubmitClicked}>Submit</Button>
                    <Button variant="outline-danger" onClick={this.emailEditClicked}>Cancel</Button>
               </InputGroup.Append>
            </InputGroup>
        </> : <>
            <label>Email Address</label>
            <InputGroup className="email">
                <Form.Group>
                    <Form.Control plaintext readOnly type="email" placeholder={this.props.activeUser.email} />
                </Form.Group>
                <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.emailEditClicked}>Edit</Button>
                </InputGroup.Append>
            </InputGroup>
        </>;

        let password = this.state.passwordClicked ? <>
            <label>Password</label>
            <InputGroup classname="password">
                <Form.Group>
                    <Form.Control type="password" placeholder="Enter a new Password"/>
                </Form.Group>   
                <Form.Group>
                    <Form.Control type="password" placeholder="Confirm your Password"/>
                </Form.Group>
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.passwordSubmitClicked}>Submit</Button>
                    <Button variant="outline-danger" onClick={this.passwordEditClicked}>Cancel</Button>
                </InputGroup.Append>
            </InputGroup>
        </> : <>
            <label>Password</label>
            <InputGroup className="password">
                <Form.Group>
                    <Form.Control plaintext readOnly type="password" placeholder="••••••••"/>
                </Form.Group>   
                <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.passwordEditClicked}>Edit</Button>
                </InputGroup.Append>
            </InputGroup>
        </>;
        return (
            <div>
                <Form>
                    {email}

                    {password}
                </Form>
            </div>  
            
        );
    }
}

export default AccountForm;