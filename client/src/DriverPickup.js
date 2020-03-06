import React, { Component } from 'react';
import PickupMap from './PickupMap.js'
import PickupInfo from './PickupInfo.js';

class DriverPickup extends Component {
    constructor(props) {
        super(props);
        this.PickupMap = React.createRef();
    }

    state = {
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
    }

    updateProgress = (progress) => {
        this.setState({ progress: progress });
    }

    standby = (wait) => {
        let self = this;
        console.log(wait);
        setTimeout(function () {
            self.setState({ standby: false });
            self.PickupMap.current.getRoute();
        }, wait);
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
            }, function () {
                let t = self.state.departureDateTime.slice(0, 19).replace('T', ' ').split(/[- :]/);
                let departureDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
                if (new Date().getTime() >= departureDate.getTime()) {
                    self.setState({ standby: false }, function () {
                        cb();
                    });
                }
                console.log("standby")
                cb((departureDate.getTime() - new Date().getTime()), self.standby);
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    render() {
        return (
            <div>
                <PickupMap info={this.state} updateProgress={this.updateProgress} getBookingInfo={this.getBookingInfo} ref={this.PickupMap} />
                <PickupInfo info={this.state} />
            </div>
        );
    }
}

export default DriverPickup;
