import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';

class Account extends Component {

    closeClicked = () => {
        this.props.handleAccountClose();
    }

    render() {
        return (
            <Modal show={this.props.handleAccount} onHide={this.closeClicked} centered>
                <Modal.Header>
                    <Modal.Title>View Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="viewAccount" id="uncontrolled-tab-example">
                        <Tab eventKey="viewAccount" title="View Account">

                        </Tab>
                        <Tab eventKey="paymentDetails" title="View Payment Details">

                        </Tab>
                        <Tab eventKey="recentBookings" title="View Recent Bookings">

                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        );
    }


}

export default Account;