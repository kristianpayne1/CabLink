import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AccountForm extends Component {

    render() {
        let showPaymentForm = this.props.editClicked ? <>
            <Form>
                <Form.Group controlId="accountFormEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder={this.props.activeUser.activeUser[0].email}/>
                </Form.Group>

                <Form.Group controlId="accountFormPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter a new Password" />
                </Form.Group>   
                <Button variant="outline-primary" onClick={this.props.handleEditClose}>Submit</Button>
            </Form>
        </> : <>
            <Form>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control plaintext readOnly type="email" placeholder={this.props.activeUser.activeUser[0].email} />
                </Form.Group>

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