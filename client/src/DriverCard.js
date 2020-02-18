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

    showDistTime = () => {
        if (this.props.pickupLocation.lat !== null && this.props.pickupLocation.lng !== null) {
            let self = this;
            this.props.callAPI(this.props.driver, function (err, dist, time) {
                if (!err) {
                    self.setState({ distance: dist.text, time: time.text });
                }
            });
        } else if (this.state.time !== null && this.state.time !== null) {
            this.setState({time: null, distance: null});
        }
    }

    showPrice = () => {
        if (this.state.price === null) {
            if ((this.props.dropoffLocation.lat !== null && this.props.dropoffLocation.lng !== null) && this.props.distance !== null) {
                let price = '£' + (Math.round((this.props.driver.base_charge + ((this.props.distance.value / 5280) / this.props.driver.mile_charge)) * 100) / 100);
                console.log(price);
                this.setState({ price: price });
            }
        } else if (this.state.price !== null) {
            if ((this.props.dropoffLocation.lat === null && this.props.dropoffLocation.lng === null) ||
                (this.props.pickupLocation.lat === null && this.props.pickupLocation.lng === null)) {
                this.setState({ price: null });
            }
        }
    }

    componentDidMount() {
        this.showDistTime();
        this.showPrice();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.pickupLocation !== prevProps.pickupLocation) {
            this.showDistTime();
        }

        if (this.props.distance !== prevProps.distance) {
            this.showPrice();
        }
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
                        Price: {this.state.price} <br />
                        Distance: {this.state.distance} <br />
                        Response time: {this.state.time}
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