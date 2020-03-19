import CustomToggle from './CustomToggle.js';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

class ConfirmBooking extends Component {

    render() {
        let time = '';
        let luggage = this.props.luggage ? "Yes" : "No";
        let disabled = this.props.disabled ? "Yes" : "No";
        if (this.props.time !== 'ASAP') {
            if (this.props.isArrivingLater === false) {
                let hours = Math.floor(this.props.time / 60 / 60);
                let mins = Math.floor(this.props.time / 60) - (hours * 60);
                time = hours.toString().padStart(2, '0') + ":" + mins.toString().padStart(2, '0');
            } else {
                let totalSecs = this.props.time - this.props.duration.value;
                let hours = Math.floor(totalSecs / 60 / 60);
                let mins = Math.floor(totalSecs / 60) - (hours * 60);
                time = hours.toString().padStart(2, '0') + ":" + mins.toString().padStart(2, '0');
            }
        } else {
            time = this.props.time;
        }
        let showConfirmation = (this.props.driver && this.props.price) ?
            <div>
                <h5>Confirm Booking</h5>
                <p id="confirm">Pick-Up Location: {this.props.pickupLocation.address}</p>
                <p id="confirm">Drop-Off Location: {this.props.dropoffLocation.address}</p>
                <p id="confirm">Time: {time}</p>
                <p id="confirm">Driver: {this.props.driver.firstname} {this.props.driver.lastname}</p>
                <p id="confirm">Cab Company: {this.props.driver.companyName}</p>
                <p id="confirm">Luggage: {luggage}</p>
                <p id="confirm">Disability Requirements: {disabled}</p>
                <p id="confirm">Number of Passengers: {this.props.passangers}</p>
                <p id="confirm"> <b>Price: {this.props.price.text}</b></p>
                <CustomToggle
                    disabled={false}
                    eventKey="0"
                    content="Change Pick-Up & Drop-Off"
                    showDrivers={null}
                    variant="outline-primary"
                    block={true}
                    size="sm"
                />
                <CustomToggle
                    disabled={false}
                    eventKey="1"
                    content="Change Extra Options"
                    showDrivers={null}
                    variant="outline-primary"
                    block={true}
                    size="sm"
                />
                <CustomToggle
                    disabled={false}
                    eventKey="2"
                    content="Change Cab"
                    showDrivers={null}
                    variant="outline-primary"
                    block={true}
                    size="sm"
                />
                <Button variant="outline-success" block onClick={() => this.props.handlePaymentShow(true)}>Confirm Booking</Button>
            </div> : null;
        return (
            <div>
                {showConfirmation}
            </div>
        );
    }
}

export default ConfirmBooking;
