import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class DriverCard extends Component {
    state = {
        distance: null,
        time: null,
        price: null,
    }

    showDriver = () => {
        this.props.handleOnHover(this.props.driver);
    }

    render() {
        let isSelected = false;
        if (this.props.selectedDriver === this.props.driver) { isSelected = true; }
        let isSelectedCard = isSelected ? 'success' : null;
        return (
            <Card style={{ width: '16rem' }} className="driverCard" onClick={this.showDriver} border={isSelectedCard}>
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.company}</Card.Subtitle>
                    <Card.Text>
                        Mobile: {this.props.mobileNo} {''}
                        Price: {this.props.price} <br />
                        Distance: {this.props.distance} <br />
                        Response time: {this.props.response}
                    </Card.Text>
                    <Button variant="outline-success">Book now</Button>
                    {' '}
                    <Button variant="outline-info">Call</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default DriverCard;