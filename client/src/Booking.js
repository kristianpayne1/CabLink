import React, { Component } from 'react';
import GoogleMap from './map.js';
import SideBar from './SideBar.js';
import Payment from './Payment.js';
import { Redirect } from "react-router-dom";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.map = React.createRef();
    }

    state = {
        sidebarOpen: false,
        currentLat: 0,
        currentLong: 0,
        drivers: [],
        pickupLocation: {
            lat: null,
            lng: null,
            address: '',
        },
        dropoffLocation: {
            lat: null,
            lng: null,
            address: '',
        },
        extraStopLocation1: {
            lat: null,
            lng: null,
            address: '',
        },
        extraStopLocation2: {
            lat: null,
            lng: null,
            address: '',
        },
        extraStopLocation3: {
            lat: null,
            lng: null,
            address: '',
        },
        distance: null,
        duration: null,
        time: 'ASAP',
        price: null,
        selectedDriver: null,
        isArrivingLater: false,
        passangers: 1,
        luggage: false,
        disabled: false,
        showPayment: false,
        processingPayment: false,
        paymentFailed: false,
        paymentSuccess: false,
        driverDuration: null,
        driverPath: null,
        redirect: false,
        bookingID: 0,
    };

    handleViewSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    setDrivers = (data) => {
        this.setState({ drivers: data });
    }

    setLocation = (lat, long) => {
        this.setState({ currentLat: lat, currentLong: long })
    }

    handlePickup = (lat, long, name) => {
        this.map.current.setPickupMarker(lat, long);
        this.setState({ pickupLocation: { lat: lat, lng: long, address: name } });
    }

    removePickup = () => {
        this.map.current.removePickupMarker();
        this.setState({ pickupLocation: { lat: null, lng: null, name: '' } });
    }

    handleDropoff = (lat, long, name) => {
        this.map.current.setDropoffMarker(lat, long);
        this.setState({ dropoffLocation: { lat: lat, lng: long, address: name } });
    }

    removeDropoff = () => {
        this.map.current.removeDropoffMarker();
        this.setState({ dropoffLocation: { lat: null, lng: null, name: '' } });
    }

    setRouteInfo = (info) => {
        if (info.duration !== null && info.distance !== null) {
            this.setState({ duration: info.duration, distance: info.distance })
        }
    }

    handleExtraStops = (id, location, name) => {
        this.map.current.setExtraStopMarkers(id, location);
        switch (id) {
            case '1':
                this.setState({ route: { extraStop1Location: { lat: location.lat, lng: location.long, address: name } } });
                break;
            case '2':
                this.setState({ route: { extraStop2Location: { lat: location.lat, lng: location.long, address: name } } });
                break;
            case '3':
                this.setState({ route: { extraStop3Location: { lat: location.lat, lng: location.long, address: name } } });
                break;
            default:
                console.log('Something went wrong')
        }
    }

    removeExtraSteps = (id) => {
        this.map.current.removeExtraStopMarkers(id);
        switch (id) {
            case '1':
                this.setState({ route: { extraStopLocation1: { lat: null, lng: null, name: '' } } });
                break;
            case '2':
                this.setState({ route: { extraStopLocation2: { lat: null, lng: null, name: '' } } });
                break;
            case '3':
                this.setState({ route: { extraStopLocation3: { lat: null, lng: null, name: '' } } });
                break;
            default:
                console.log('Something went wrong');
        }
    }

    showDriver = (lat, lng, driver) => {
        this.map.current.centerToPoint(lat, lng);
        this.setState({ selectedDriver: driver });
    }

    setPrice = (price) => {
        this.setState({ price: price });
    }

    removePrice = () => {
        this.setState({ price: null })
    }

    handleDriverInfo = (duration, path) => {
        this.setState({ driverDuration: duration, driverPath: path });
    }

    handleTimeChange = (time) => {
        this.setState({ time: time });
    }

    handleIsArrivingLater = (isArriving) => {
        this.setState({ isArrivingLater: isArriving });
    }

    setLuggage = (state) => {
        this.setState({ luggage: state });
    }

    setDisabled = (state) => {
        this.setState({ disabled: state });
    }

    setPassangers = (num) => {
        this.setState({ passangers: num });
    }

    handlePaymentShow = (state) => {
        this.setState({ showPayment: state });
    }

    bookDriver = () => {
        let driver = this.state.selectedDriver;
        let data = {
            firstname: driver.firstname,
            lastname: driver.lastname,
            mobileNo: driver.mobileNo,
            companyID: driver.companyID,
            currentLat: driver.currentLat,
            currentLong: driver.currentLong,
            isFree: 0,
        }
        fetch(process.env.REACT_APP_SERVER + "/driver/update/"+this.state.selectedDriver.driverID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
        }).catch(function(err) {
            console.log(err)
        });
    }

    makeBooking = () => {
        this.setState({ processingPayment: true });
        let self = this;
        let routeData = {
            departureLat: this.state.pickupLocation.lat,
            departureLong: this.state.pickupLocation.lng,
            extraStop1Lat: this.state.extraStopLocation1.lat,
            extraStop1Long: this.state.extraStopLocation1.lng,
            extraStop2Lat: this.state.extraStopLocation2.lat,
            extraStop2Long: this.state.extraStopLocation2.lng,
            extraStop3Lat: this.state.extraStopLocation3.lat,
            extraStop3Long: this.state.extraStopLocation3.lng,
            destinationLat: this.state.dropoffLocation.lat,
            destinationLong: this.state.dropoffLocation.lng,
        }
        fetch(process.env.REACT_APP_SERVER + "/route/new", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(routeData)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            let userID = self.props.activeUser ? self.props.activeUser.userID : 1;
            let date = new Date();
            if (self.state.time === 'ASAP') {
                date.setSeconds(date.getSeconds() + self.state.driverDuration.value);
            } else if (!(self.state.isArrivingLater)) {
                date.setHours(0, 0, 0, 0);
                date.setSeconds(date.getSeconds() + self.state.time);
            } else {
                date.setHours(0, 0, 0, 0);
                date.setSeconds((date.getSeconds() + self.state.time) - self.state.duration.value);
            }
            let luggage = self.state.luggage ? 1 : 0;
            let disabled = self.state.disabled ? 1 : 0;
            let bookingData = {
                driverID: self.state.selectedDriver.driverID,
                userID: userID,
                routeID: data.insertId,
                departureDateTime: date.toISOString().slice(0, 19).replace('T', ' '),
                noPassangers: self.state.passangers,
                luggage: luggage,
                disabled: disabled,
                price: self.state.price.value,
                complete: 0,
            }
            setTimeout(function () {
                fetch(process.env.REACT_APP_SERVER + "/booking/new", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).then(function (data) {
                    self.bookDriver();
                    self.setState({ paymentSuccess: true });
                    setTimeout(function () {
                        self.setState({ showPayment: false, redirect: true, bookingID: data.insertId });
                        setTimeout(function () {
                            self.setState({ paymentSuccess: false, processingPayment: false });
                        }, 500);
                    }, 2000)
                }).catch(function (err) {
                    console.log(err);
                    self.setState({ paymentFailed: true });
                    setTimeout(function () {
                        self.setState({ paymentFailed: false, processingPayment: false });
                    }, 2000);
                });
            }, 1000);

        }).catch(function (err) {
            console.log(err);
            self.setState({ paymentFailed: true });
            setTimeout(function () {
                self.setState({ paymentFailed: false, processingPayment: false });
            }, 2000);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/proj/co600/project/c37_cablink/pickup/' + this.state.bookingID} driverDuration={this.state.driverDuration} />
        }
        return (
            <div>
                <Payment
                    handleShow={this.state.showPayment}
                    handlePaymentShow={this.handlePaymentShow}
                    makeBooking={this.makeBooking}
                    processingPayment={this.state.processingPayment}
                    paymentFailed={this.state.paymentFailed}
                    paymentSuccess={this.state.paymentSuccess}
                />
                <GoogleMap
                    drivers={this.state.drivers}
                    currentLat={this.state.currentLat}
                    currentLong={this.state.currentLong}
                    updateDrivers={this.setDrivers}
                    updateLocation={this.setLocation}
                    setRouteInfo={this.setRouteInfo}
                    ref={this.map}
                />
                <SideBar
                    isOpen={this.state.sidebarOpen}
                    drivers={this.state.drivers}
                    currentLat={this.state.currentLat}
                    currentLong={this.state.currentLong}
                    toggleSidebar={this.handleViewSidebar}
                    handlePickup={this.handlePickup}
                    handleDropoff={this.handleDropoff}
                    handleExtraStops={this.handleExtraStops}
                    removePickup={this.removePickup}
                    removeDropoff={this.removeDropoff}
                    removeExtraSteps={this.removeExtraSteps}
                    showDriver={this.showDriver}
                    pickupLocation={this.state.pickupLocation}
                    dropoffLocation={this.state.dropoffLocation}
                    extraStopLocation1={this.state.extraStopLocation1}
                    extraStopLocation2={this.state.extraStopLocation2}
                    extraStopLocation3={this.state.extraStopLocation3}
                    distance={this.state.distance}
                    duration={this.state.duration}
                    time={this.state.time}
                    handleTimeChange={this.handleTimeChange}
                    setPrice={this.setPrice}
                    price={this.state.price}
                    removePrice={this.removePrice}
                    selectedDriver={this.state.selectedDriver}
                    isArrivingLater={this.state.isArrivingLater}
                    handleIsArrivingLater={this.handleIsArrivingLater}
                    setLuggage={this.setLuggage}
                    setDisabled={this.setDisabled}
                    setPassangers={this.setPassangers}
                    luggage={this.state.luggage}
                    disabled={this.state.disabled}
                    passangers={this.state.passangers}
                    handlePaymentShow={this.handlePaymentShow}
                    handleDriverInfo={this.handleDriverInfo}
                />
            </div>
        );
    }
}

export default Booking;