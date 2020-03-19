import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CustomToggle from './CustomToggle.js';

// Card used in driver listing to display driver info
class DriverCard extends Component {
    state = {
        distance: null,
        time: null,
        price: null,
    }

    // when card is clicked centers map to driver location
    showDriver = () => {
        this.props.handleOnHover(this.props.driver);
    }

    render() {
        let isSelected = false;
        if (this.props.selectedDriver === this.props.driver) { isSelected = true; }
        let isSelectedCard = isSelected ? 'success' : null;
        let telephone = "tel: " + this.props.mobileNo;
        return (
            <Card style={{ width: '16rem' }} className="driverCard" onClick={this.showDriver} border={isSelectedCard} >
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.company}</Card.Subtitle>
                    <Card.Text>
                        Mobile: {this.props.mobileNo} {''}
                        Price: {this.props.price} <br />
                        Distance Away: {this.props.distance} <br />
                        Response Time: {this.props.response}
                    </Card.Text>
                    <CustomToggle
                        disabled={false}
                        eventKey="3"
                        content="Book Now"
                        showDrivers={null}
                        variant="outline-success"
                        block={false}
                        size={null}
                    />
                    {' '}
                    <Button variant="outline-info" href={telephone}>Call</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default DriverCard;