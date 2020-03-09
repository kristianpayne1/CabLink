import React, { Component } from 'react';
import PickupMap from './PickupMap.js'
import PickupInfo from './PickupInfo.js';

class DriverPickup extends Component {
    constructor(props) {
        super(props);
        this.PickupMap = React.createRef();
    }

    state = {
        bookingInfo: null,
        departureDateTime: null,
        driverName: null,
        driverNo: null,
        driverLocation: {
            lat: 0,
            lng: 0,
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
    }

    updateProgress = (progress) => {
        this.setState({ progress: progress });
        if (progress === 100 && this.state.complete === 0) {
            this.completeBooking();
        }
    }

    standby = (wait) => {
        let self = this;
        console.log(wait);
        setTimeout(function () {
            self.setState({ standby: false });
            self.PickupMap.current.getRoute();
        }, wait);
    }

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
            self.freeDriver();
            setTimeout(function () {
                self.setState({complete: 1}); 
             }, 300000);
        }).catch(function (err) {
            console.log(err)
        });
    }

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
            self.setState({
                departureDateTime: data[0].departureDateTime,
                driverName: data[0].firstname + ' ' + data[0].lastname,
                driverNo: data[0].mobileNo,
                driverLocation: {
                    lat: data[0].currentLat,
                    lng: data[0].currentLong,
                },
                pickupLocation: {
                    lat: data[0].departureLat,
                    lng: data[0].departureLong,
                },
                companyName: data[0].companyName,
                car: data[0].colour + ' ' + data[0].make + ' ' + data[0].model,
                reg: data[0].registrationNo,
                bookingInfo: data[0],
            }, function () {
                if (data[0].complete === 0) {
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

    freeDriver = () => {
        let driver = this.state.selectedDriver;
        let data = {
            firstname: driver.firstname,
            lastname: driver.lastname,
            mobileNo: driver.mobileNo,
            companyID: driver.companyID,
            currentLat: driver.currentLat,
            currentLong: driver.currentLong,
            isFree: 1,
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

    render() {
        let inProgress = this.state.complete !== 1 ?
            <div>
                <PickupMap info={this.state} updateProgress={this.updateProgress} getBookingInfo={this.getBookingInfo} ref={this.PickupMap} />
                <PickupInfo info={this.state} pickupDate={this.state.pickupDate} />
            </div> :
            <div>
                <br />
                <h5 style={{ 'text-align': 'center' }}>403 Forbidden</h5>
            </div>
        return (
            <div>
                {inProgress}
            </div>
        );
    }
}

export default DriverPickup;
