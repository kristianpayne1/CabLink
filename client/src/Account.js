import React, { Component } from 'react';
// react components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import AccountForm from './AccountForm.js';
import PaymentForm from './PaymentForm.js';
import RecentBookings from './RecentBookings.js';

// modal contaning account details, payment details and recent bookings
class Account extends Component {

    //closes the modal
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
                            <PaymentForm activeUser={this.props.activeUser}></PaymentForm>
                        </Tab>
                        <Tab eventKey={3} title="View Recent Bookings">
                            <RecentBookings activeUser={this.props.activeUser}></RecentBookings>
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