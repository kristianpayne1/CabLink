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
        if (this.emailInput.current != null){
            let email = this.emailInput.current.value;
            this.updateEmail(email);
        } 
        if (this.emailInput.current != null){
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

    passwordEditClicked = () => {
        if(this.state.passwordClicked === false){
            this.setState({passwordClicked: true});
        } else {
            this.setState({passwordClicked: false});
        }
    }

    updatePassword(password){

    }

    updateEmail(email){

    }

    render() {
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        console.log(this.props.activeUser);
        let email = this.state.emailClicked ? <>
            <label>Email Address</label>
            <InputGroup classname="email">
                <Form.Group>
                    <Form.Control type="email" placeholder={this.props.activeUser.email} />
                </Form.Group>
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.emailEditClicked}>Submit</Button>
                    <Button variant="outline-danger" onClick={this.emailEditClicked}>Cancel</Button>
               </InputGroup.Append>
            </InputGroup>
        </> : <>
            <label>Email Address</label>
            <InputGroup classname="email">
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
                    <Button variant="outline-primary" onClick={this.passwordEditClicked}>Submit</Button>
                    <Button variant="outline-danger" onClick={this.passwordEditClicked}>Cancel</Button>
                </InputGroup.Append>
            </InputGroup>
        </> : <>
            <label>Password</label>
            <InputGroup classname="password">
                <Form.Group>
                    <Form.Control plaintext readOnly type="password" placeholder="••••••••"/>
                </Form.Group>   
                <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.passwordEditClicked}>Edit</Button>
                </InputGroup.Append>
            </InputGroup>
        </>;
        // if edit button is clicked enable form otherwise disable.
        let showPaymentForm = this.props.editClicked ? <>
            <Form>
                <Form.Group controlId="accountFormEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder={this.props.activeUser.email} defaultValue={this.props.activeUser.email}/>
                </Form.Group>

                <Form.Group controlId="accountFormPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter a new Password" />
                </Form.Group>   
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password" />
                </Form.Group>
            </Form>
        </> : <>
            <Form>
                {email}

                {password}
            </Form>
        </>;
        return (
            <div>
                {showPaymentForm}
            </div>  
            
        );
    }
}

export default AccountForm;