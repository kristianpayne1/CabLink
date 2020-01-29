import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class DriverCard extends Component {

    render() {
        return (
            <Card style={{ width: '16rem' }} >
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.company}</Card.Subtitle>
                    <Card.Text>
                        Mobile: {this.props.mobileNo}
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