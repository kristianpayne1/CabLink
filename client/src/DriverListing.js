import React, { Component } from 'react';
import DriverCard from './DriverCard.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SelectableContext from 'react-bootstrap/SelectableContext';
import Card from 'react-bootstrap/Card';

// for google API calls
const google = window.google;

// Lists all the available drivers for user to selected in specified order (recommended DEFAULT)
class DriverListing extends Component {
    state = {
        driverDistanceTime: [],
        selectedDriver: null,
        sortByText: '',
    };

    // Call google api for every driver and compute price for trip and distance from pick up. Then sorts by recommended
    loadDrivers = async () => {
        let self = this;
        this.props.drivers.map((driver) =>
            this.callAPI(driver, function (err, dist, time, path) {
                if (!err) {
                    // calculate trip price 
                    let price = driver.base_charge + ((driver.mile_charge / 5280) * (self.props.distance.value + dist.value));
                    price = Math.round(price * 100) / 100;
                    let price_text = '£' + price;
                    // if driver is already loaded, update their info else add them.
                    let found = self.checkIfLoaded(driver);
                    if (!found) {
                        self.state.driverDistanceTime.push({ driver: driver, distance: dist, time: time, price: { value: price, text: price_text }, path: path });
                    } else {
                        self.state.driverDistanceTime.forEach(item => {
                            if (item.driver === driver) {
                                item.distance = dist;
                                item.time = time;
                                item.price.value = price;
                                item.price.text = price_text;
                                item.path = path;
                            }
                        })
                    }
                    self.handleSortBy(1);
                }
            }),
        );
    }

    // when driver card is clicked set booking price and driver info ready for completion
    handleOnHover = async (driver) => {
        this.props.showDriver(driver.currentLat, driver.currentLong, driver);
        this.state.driverDistanceTime.forEach(item => {
            if (item.driver === driver) {
                this.props.setPrice(item.price);
                this.props.handleDriverInfo(item.time, item.path);
            }
        })
        this.setState({ selectedDriver: driver });
    }

    // list all the drivers in cards.
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

    // checks if the driver is already loaded
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

    // orders array of drivers by lowest price first
    sortByPrice = () => {
        let sorted = this.state.driverDistanceTime.slice(0);
        sorted.sort(function (a, b) {
            return a.price.value - b.price.value
        });
        return sorted;
    }

    // orders array of drivers by lowest response time first
    sortByResponse = () => {
        let sorted = this.state.driverDistanceTime.slice(0);
        sorted.sort(function (a, b) {
            return a.time.value - b.time.value
        });
        return sorted;
    }

    // sorts array of drivers by lowest price and shortest distance away.
    sortByRecommend = () => {
        let recommendList = [];
        // get array of driver sorted by price and assign point to each (higher the better)
        let priceList = this.sortByPrice();
        for (let i = 0; i < priceList.length; i++) {
            recommendList.push({ item: { driver: priceList[i], points: priceList.length - i } });
        }
        // get array of drivers sorted by quickest response (higher the better)
        let responseList = this.sortByResponse();
        for (let i = 0; i < responseList.length; i++) {
            let index = this.findWithAttr(recommendList, responseList[i]);
            recommendList[index].item.points += (responseList.length - i) * 2;
        }
        // sort array by how many points they have (higher is better)
        recommendList = recommendList.sort(function (a, b) {
            return b.item.points - a.item.points
        });
        let sorted = [];
        recommendList.forEach(item => {
            sorted.push(item.item.driver);
        });
        return sorted;
    }

    // finds driver in given array
    findWithAttr(array, driver) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].item["driver"] === driver) {
                return i;
            }
        }
        return -1;
    }

    // sort drivers by specified order
    handleSortBy = (num) => {
        let list = [];
        switch (num) {
            case 1:
                list = this.sortByRecommend();
                this.setState({ sortByText: 'Recommended' })
                break;
            case 2:
                list = this.sortByResponse();
                this.setState({ sortByText: 'Fastest response' })
                break;
            case 3:
                list = this.sortByPrice();
                this.setState({ sortByText: 'Lowest price' })
                break;
            default:
                list = this.sortByRecommend();
                break;
        }
        this.setState({ driverDistanceTime: list }, () => {
            this.listDrivers();
        });
    }

    // get the distance and time between driver and pickup location
    callAPI = async (driver, cb) => {
        let driverLatLng = { lat: driver.currentLat, lng: driver.currentLong };
        let pickUpLatLng = { lat: this.props.currentLat, lng: this.props.currentLong };
        if (this.props.pickupLocation.lat !== null && this.props.pickupLocation.lng !== null) {
            pickUpLatLng = { lat: this.props.pickupLocation.lat, lng: this.props.pickupLocation.lng };
        }

        let date = new Date();
        let currentDate = new Date();
        if (this.props.time !== 'ASAP') {
            if (this.props.isArrivingLater !== false) {
                date.setHours(0, 0, 0, 0);
                let msFromMidnight = currentDate - date;
                if (!(msFromMidnight / 60 > date.getSeconds() + (this.props.time - this.props.duration.value)))
                {
                    date.setSeconds((date.getSeconds() + (this.props.time - this.props.duration.value)));
                } else {
                    date.setHours(24, 0, 0, 0);
                    date.setSeconds(date.getSeconds() + (this.props.time - this.props.duration.value));
                }
            }else{
                date.setHours(0, 0, 0, 0);
                let msFromMidnight = currentDate - date;
                if (!(msFromMidnight / 60 > date.getSeconds() + this.props.time)) {
                    date.setSeconds(date.getSeconds() + this.props.time);
                } else {
                    date.setHours(24, 0, 0, 0);
                    date.setSeconds(date.getSeconds() + this.props.time);
                }
            }
        }

        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();

        directionsService.route({
            origin: driverLatLng,
            destination: pickUpLatLng,
            travelMode: 'DRIVING',
            drivingOptions: {
                // TODO change to depature time
                departureTime: date,
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
                cb(null, distance, time, response.routes[0].overview_path);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    render() {
        // show warning if user is viewing listing without specifying pick up and drop off location
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
            <div>
                <SelectableContext.Provider value={false}>
                    <div style={{ display: 'inline-block' }}>
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
                    </div>
                    <div style={{ display: 'inline-block', color: 'grey' }}>
                        <p>{this.state.sortByText}</p>
                    </div>
                </SelectableContext.Provider>
                {this.listDrivers()}
            </div>
        return (
            <div>
                {showWarning}
            </div>
        );
    }
}

export default DriverListing;
