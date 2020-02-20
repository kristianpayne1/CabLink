import CustomToggle from './CustomToggle.js';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

class ConfirmBooking extends Component {

    render() {
        console.log(this.props.price);
        let showConfirmation = (this.props.driver && this.props.price) ?
            <div>
                <h5>Confirm booking</h5>
                <p>Pick up location: {this.props.pickupLocation.address}</p>
                <p>Drop off location: {this.props.dropoffLocation.address}</p>
                <p>Time: </p>
                <p>Driver: {this.props.driver.firstname} {this.props.driver.lastname}</p>
                <p>Cab company: {this.props.driver.companyName}</p>
                <p><b>Price: {this.props.price.text}</b></p>
                <CustomToggle
                    disabled={false}
                    eventKey="0"
                    content="Change pick up & drop off"
                    showDrivers={null}
                    variant="outline-primary"
                    block={true}
                    size="sm"
                />
                <CustomToggle
                    disabled={false}
                    eventKey="1"
                    content="Change cab"
                    showDrivers={null}
                    variant="outline-primary"
                    block={true}
                    size="sm"
                /><br />
                <Button variant="outline-success" block>Confirm booking</Button>
            </div> : null;
        return (
            <div>
                {showConfirmation}
            </div>
        );
    }
}

export default ConfirmBooking;
