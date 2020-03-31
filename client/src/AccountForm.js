import React, { Component } from 'react';
// react components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import hash from 'object-hash';

// View account details
class AccountForm extends Component {
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

    updatePassword(password){

    }

    updateEmail(email){

    }

    render() {
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        console.log(this.props.activeUser);
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
                <Button variant="outline-primary" onClick={this.handleEditSubmit}>Submit</Button>
            </Form>
        </> : <>
            <Form>
                <label>Email Address</label>
                <InputGroup classname="email">
                    <Form.Group>
                        <Form.Control plaintext readOnly type="email" placeholder={this.props.activeUser.email} />
                    </Form.Group>
                    <InputGroup.Append>
                        <Button variant="outline-success">Edit</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control plaintext readOnly type="password" placeholder="••••••••"/>
                </Form.Group>   
                <Button variant="outline-success" onClick={this.props.handleEditShow}>Edit</Button>
            </Form>
        </>
        return (
            <div>
                {showPaymentForm}
            </div>  
            
        );
    }
}

export default AccountForm;