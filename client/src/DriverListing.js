import React, { Component } from 'react';
import DriverCard from './DriverCard.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SelectableContext from 'react-bootstrap/SelectableContext';
import Card from 'react-bootstrap/Card';

const google = window.google;

class DriverListing extends Component {
    state = {
        driverDistanceTime: [],
        selectedDriver: null,
    };

    componentDidUpdate(prevProps) {
        if (this.props.pickupLocation !== prevProps.pickupLocation) {
            this.loadDrivers();
        }
    }

    loadDrivers = () => {
        let self = this;
        console.log('Pick up and drop off location set');
        console.log(this.props.drivers);
        this.props.drivers.map((driver) =>
            this.callAPI(driver, function (err, dist, time) {
                if (!err) {
                    let price = driver.base_charge + ((driver.mile_charge / 5280) * self.props.distance);
                    let price_text = '£' + price;
                    self.state.driverDistanceTime.push({ driver: driver, distance: dist, time: time, price: { value: price, text: price_text } });
                }
            })
        );
        this.handleSortBy(1);

    }

    handleOnHover = async (driver) => {
        this.props.showDriver(driver.currentLat, driver.currentLong);
        this.setState({ selectedDriver: driver });
    }

    listDrivers() {
        return (
            this.state.driverDistanceTime.map((item) =>
                <div key={item.driver.driverID}>
                    <DriverCard
                        name={item.driver.firstname + ' ' + item.driver.lastname}
                        company={item.driver.companyName}
                        mobileNo={item.driver.mobileNo}
                        key={item.driver.driverID}
                        driver={item.driver}
                        handleOnHover={this.handleOnHover}
                        selectedDriver={this.state.selectedDriver}
                        response={item.time.text}
                        distance={item.distance.text}
                        price={item.price.text}
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

    sortByPrice = () => {
        let sorted = this.state.driverDistanceTime.sort(function (a, b) {
            return a.price.value - b.price.value
        });
        console.log(sorted);
        return sorted;
    }

    sortByResponse = () => {
        let sorted = this.state.driverDistanceTime.sort(function (a, b) {
            return a.time.value - b.time.value
        });
        console.log(sorted);
        return sorted;
    }

    sortByRecommend = () => {
        let list = this.state.driverDistanceTime;
        let priceList = this.sortByPrice();
        let responseList = this.sortByResponse();
        for (let i = 0; i < priceList.length; i++) {
            list.driver.point = i;
        }
        for (let i = 0; i < responseList.length; i++) {
            list.driver.point += i;
        }
        let sorted = list.sort(function (a, b) {
            return a.driver.point - b.driver.point
        });
        console.log(sorted);
        return sorted;
    }

    handleSortBy = (num) => {
        let list = this.state.driverOrder;
        switch (num) {
            case 1:
                list = this.sortByRecommend();
                break;
            case 2:
                list = this.sortByResponse();
                break;
            case 3:
                list = this.sortByPrice();
                break;
            default:
                list = this.sortByRecommend();
                break;
        }
        this.setState({ driverOrder: list }, () => {
            this.listDrivers();
        });
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
