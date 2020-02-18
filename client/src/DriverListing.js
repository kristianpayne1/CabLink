import React, { Component } from 'react';
import DriverCard from './DriverCard.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SelectableContext from 'react-bootstrap/SelectableContext';
import Card from 'react-bootstrap/Card';

const google = window.google;

class DriverListing extends Component {
    state = {
        driverOrder: [],
        driverDistanceTime: [],
        selectedDriver: null,
    };

    handleOnHover = async (driver, cb) => {
        this.props.showDriver(driver.currentLat, driver.currentLong);
        this.setState({ selectedDriver: driver });
    }

    listDrivers() {
        return (
            this.props.drivers.map((driver) =>
                <div key={driver.driverID}>
                    <DriverCard
                        name={driver.firstname + ' ' + driver.lastname}
                        company={driver.companyName}
                        mobileNo={driver.mobileNo}
                        key={driver.driverID}
                        driver={driver}
                        handleOnHover={this.handleOnHover}
                        selectedDriver={this.state.selectedDriver}
                        route={this.props.route}
                        callAPI={this.callAPI}
                    />
                    <br />
                </div>
            )
        )
    }

    checkIfLoaded = (driver) => {
        let list = this.state.driverDistanceTime;
        let found = false;
        list.forEach(item => {
            if (item.driver.driverID === driver.driverID) {
                found = true;
            }
        });
        return found;
    }

    handleSortBy = (num) => {
        switch (num) {
            case 1:
                console.log(num);
                break;
            case 2:
                console.log(num);
                break;
            case 3:
                console.log(num);
                break;
            default:
                break;
        }
    }

    // get the distance and time between driver and pickup location
    callAPI = async (driver, cb) => {
        let found = this.checkIfLoaded(driver);
        if (found === false) {
            let driverLatLng = { lat: driver.currentLat, lng: driver.currentLong };
            let pickUpLatLng = { lat: this.props.currentLat, lng: this.props.currentLong };
            if (this.props.route.pickupLocation.lat !== null && this.props.route.pickupLocation.lng !== null) {
                pickUpLatLng = { lat: this.props.route.pickupLocation.lat, lng: this.props.route.pickupLocation.lng };
            }

            let directionsService = new google.maps.DirectionsService();
            let directionsDisplay = new google.maps.DirectionsRenderer();

            directionsService.route({
                origin: driverLatLng,
                destination: pickUpLatLng,
                travelMode: 'DRIVING',
                drivingOptions: {
                    departureTime: new Date(/* now, or future date */),
                    trafficModel: 'bestguess'
                },
            }, (response, status) => {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    // expressed in meters
                    let distance = directionsDisplay.directions.routes[0].legs[0].distance;
                    // expressed in secs
                    let time = directionsDisplay.directions.routes[0].legs[0].duration_in_traffic;
                    this.state.driverDistanceTime.push({ driver: driver, distance: distance, time: time });
                    cb(null, distance, time);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    }

    render() {
        let showWarning = (this.props.route.pickupLocation.lat === null && this.props.route.pickupLocation.lat === null) ?
            <Card border="warning" text="black">
                <Card.Body>
                    <Card.Text style={{ fontSize: '15px' }}>
                        Please choose a pick up location to display price, distance and response time.
            </Card.Text>
                </Card.Body>
            </Card> : null;
        return (
            <div>
                {showWarning}
                <SelectableContext.Provider value={false}>
                    <DropdownButton
                        key='dropdown'
                        id={'sortby-dropdown'}
                        size="sm"
                        variant="secondary-light"
                        title="Sort by"
                    >
                        <Dropdown.Item onSelect={() => this.handleSortBy(1)}>Recommended</Dropdown.Item>
                        <Dropdown.Item onSelect={() => this.handleSortBy(2)}>Fastest response</Dropdown.Item>
                        <Dropdown.Item onSelect={() => this.handleSortBy(3)}>Lowest price</Dropdown.Item>
                    </DropdownButton>
                    {this.listDrivers()}
                </SelectableContext.Provider>
            </div>
        );
    }
}

export default DriverListing;
