import CustomToggle from './CustomToggle.js';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

class ConfirmBooking extends Component {

    render() {
        let time = '';
        if (this.props.time !== 'ASAP') {
            let hours = Math.floor(this.props.time / 60 / 60);
            let mins = Math.floor(this.props.time / 60) - (hours * 60);
            time = hours.toString().padStart(2, '0') + ":" + mins.toString().padStart(2, '0');
        }else{
            time = this.props.time;
        }
        let showConfirmation = (this.props.driver && this.props.price) ?
            <div>
                <h5>Confirm booking</h5>
                <p>Pick up location: {this.props.pickupLocation.address}</p>
                <p>Drop off location: {this.props.dropoffLocation.address}</p>
                <p>Time: {time}</p>
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
