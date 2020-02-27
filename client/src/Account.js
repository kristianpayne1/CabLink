import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import AccountForm from './AccountForm.js';
import PaymentForm from './PaymentForm.js';

class Account extends Component {

    closeClicked = () => {
        this.props.handleAccountClose();
    }

    render() {
        return (
            <Modal size="lg" show={this.props.handleAccount} onHide={this.closeClicked} centered>
                <Modal.Header>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey={this.props.eventKey} id="uncontrolled-tab-example" fill>
                        <Tab eventKey={1} title="View Account">
                            <AccountForm activeUser={this.props.activeUser} editClicked={this.props.editClicked} handleEditShow={this.props.handleEditShow} handleEditClose={this.props.handleEditClose}></AccountForm>
                        </Tab>
                        <Tab eventKey={2} title="View Payment Details">
                            <PaymentForm></PaymentForm>
                        </Tab>
                        <Tab eventKey={3} title="View Recent Bookings">

                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeClicked}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }


}

export default Account;