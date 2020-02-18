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

    handleOnHover = async (driver) => {
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
                        callAPI={this.callAPI}
                        pickupLocation={this.props.pickupLocation}
                        dropoffLocation={this.props.dropoffLocation}
                        distance={this.props.distance}
                        duration={this.props.duration}
                        setPrice={this.props.setPrice}
                        removePrice={this.props.removePrice}
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
            if (this.props.pickupLocation.lat !== null && this.props.pickupLocation.lng !== null) {
                pickUpLatLng = { lat: this.props.pickupLocation.lat, lng: this.props.pickupLocation.lng };
            }

            let directionsService = new google.maps.DirectionsService();
            let directionsDisplay = new google.maps.DirectionsRenderer();

            directionsService.route({
                origin: driverLatLng,
                destination: pickUpLatLng,
                travelMode: 'DRIVING',
                drivingOptions: {
                    // TODO change to depature time
                    departureTime: new Date(/* now, or future date */),
                    trafficModel: 'bestguess'
                },
                unitSystem: google.maps.UnitSystem.IMPERIAL,
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
        let showWarning = ((this.props.pickupLocation.lat === null && this.props.pickupLocation.lng === null)
            && (this.props.dropoffLocation.lat === null && this.props.dropoffLocation.lng == null)) ?
            <Card border="warning" text="black">
                <Card.Body>
                    <Card.Text style={{ fontSize: '18px' }}>
                        Please choose a pick up & drop off location.
            </Card.Text>
                </Card.Body>
            </Card>
            :
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
            </SelectableContext.Provider>;
        return (
            <div>
                {showWarning}
            </div>
        );
    }
}

export default DriverListing;
