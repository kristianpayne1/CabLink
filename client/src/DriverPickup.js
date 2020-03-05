import React, { Component } from 'react';
import PickupMap from './PickupMap.js'
import PickupInfo from './PickupInfo.js';

class DriverPickup extends Component {
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
    }

    updateProgress = (progress) => {
        this.setState({progress: progress});
    }

    componentDidMount() {
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
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    render() {
        return (
            <div>
                <PickupMap info={this.state} updateProgress={this.updateProgress}/>
                <PickupInfo info={this.state} />
            </div>
        );
    }
}

export default DriverPickup;
