import React, { Component } from 'react';
import PickupMap from './PickupMap.js'
import PickupInfo from './PickupInfo.js';

// Show pickup of map and how far driver is away from pick up location
class DriverPickup extends Component {
    constructor(props) {
        super(props);
        // prepares pick up map methods to be called from here.
        this.PickupMap = React.createRef();
    }

    state = {
        bookingInfo: null,
        departureDateTime: null,
        driver: {
            driverID: 0,
            firstname: null,
            lastname: null,
            companyID: 0,
            driverName: null,
            driverNo: null,
            driverLocation: {
                lat: 0,
                lng: 0,
            },
            isFree: 0,
        },
        pickupLocation: {
            lat: 0,
            lng: 0,
        },
        companyName: null,
        car: null,
        reg: null,
        progress: 0,
        standby: true,
        pickupDate: null,
        complete: 0,
        cancelled: false,
    }

    // updates progress bar
    updateProgress = (progress) => {
        this.setState({ progress: progress });
    }

    // if departure time is not equal to or less than the current time, put the driver on standby till it is
    standby = (wait) => {
        let self = this;
        setTimeout(function () {
            self.setState({ standby: false });
            self.PickupMap.current.getRoute();
        }, wait);
    }

    // updates the database to inform the booking is complete 
    completeBooking = () => {
        let self = this;
        let data = {
            driverID: this.state.bookingInfo.driverID,
            userID: this.state.bookingInfo.userID,
            routeID: this.state.bookingInfo.routeID,
            departureDateTime: this.state.bookingInfo.departureDateTime.slice(0, 19).replace('T', ' '),
            noPassangers: this.state.bookingInfo.noPassangers,
            luggage: this.state.bookingInfo.luggage,
            disabled: this.state.bookingInfo.disabled,
            price: this.state.bookingInfo.price,
            complete: 1,
        }
        // update driver to be available
        this.freeDriver();
        fetch(process.env.REACT_APP_SERVER + '/booking/update/' + this.props.match.params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function () {
            // wait 5 mins before closing page
            setTimeout(function () {
                self.setState({ complete: 1 });
            }, 300000);
        }).catch(function (err) {
            console.log(err)
        });
    }

    // gets booking info of pickup such as time and driver etc. 
    getBookingInfo = (cb) => {
        let self = this;
        fetch(process.env.REACT_APP_SERVER + '/booking/get/pickup/' + this.props.match.params.id, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            // stores all booking info
            self.setState({
                departureDateTime: data[0].departureDateTime,
                driver: {
                    driverID: data[0].driverID,
                    firstname: data[0].firstname,
                    lastname: data[0].lastname,
                    companyID: data[0].companyID,
                    driverName: data[0].firstname + ' ' + data[0].lastname,
                    driverNo: data[0].mobileNo,
                    driverLocation: {
                        lat: data[0].currentLat,
                        lng: data[0].currentLong,
                    },
                    isFree: data[0].isFree,
                },
                pickupLocation: {
                    lat: data[0].departureLat,
                    lng: data[0].departureLong,
                },
                companyName: data[0].companyName,
                car: data[0].colour + ' ' + data[0].make + ' ' + data[0].model,
                reg: data[0].registrationNo,
                bookingInfo: data[0],
                complete: data[0].complete,
            }, function () {
                // booking is not already complete load all the info and start pickup
                if (self.state.complete === 0) {
                    let t = self.state.departureDateTime.slice(0, 19).replace('T', ' ').split(/[- :]/);
                    let departureDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
                    self.setState({ pickupDate: departureDate });
                    if (new Date().getTime() >= departureDate.getTime()) {
                        self.setState({ standby: false }, function () {
                            cb();
                        });
                    }
                    cb((departureDate.getTime() - new Date().getTime()), self.standby);
                }
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    // updates driver to make them available after booking completion
    freeDriver = () => {
        let driver = this.state.driver;
        let data = {
            firstname: driver.firstname,
            lastname: driver.lastname,
            mobileNo: driver.driverNo,
            companyID: driver.companyID,
            currentLat: driver.driverLocation.lat,
            currentLong: driver.driverLocation.lng,
            isFree: 1,
        }
        fetch(process.env.REACT_APP_SERVER + "/driver/update/" + this.state.driver.driverID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
        }).catch(function (err) {
            console.log(err)
        });
    }

    // sets the drivers location when booking completed.
    handleDriverLocation = (location) => {
        let driver = this.state.driver;
        this.setState({ driver: { 
            driverID: driver.driverID,
            firstname: driver.firstname,
            lastname: driver.lastname,
            companyID: driver.companyID,
            driverName: driver.driverName,
            driverNo: driver.driverNo,
            driverLocation: { lat: location.lat, lng: location.lng },
            isFree: driver.isFree,
         } }, function() {
            this.completeBooking();
        });
    }

    // cancels the booking if user presses the cancel button
    handleCancelBooking = () => {
        this.setState({cancelled : true});
        this.completeBooking();
    }

    render() {
        // if booking already complete show page not found otherwise proceeed with pickup
        let inProgress = this.state.complete !== 1 ?
            <div>
                <PickupMap 
                    info={this.state} 
                    updateProgress={this.updateProgress} 
                    getBookingInfo={this.getBookingInfo} 
                    ref={this.PickupMap} 
                    handleDriverLocation={this.handleDriverLocation}
                    completeBooking={this.completeBooking}
                    cancelled={this.state.cancelled}
                />
                <PickupInfo info={this.state} pickupDate={this.state.pickupDate} cancelled={this.state.cancelled} handleCancelBooking={this.handleCancelBooking}/>
            </div> :
            <div>
                <br />
                <h5 style={{ 'text-align': 'center' }}>Oops! Page Not Found</h5>
            </div>
        return (
            <div>
                {inProgress}
            </div>
        );
    }
}

export default DriverPickup;
