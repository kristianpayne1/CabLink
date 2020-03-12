import React from 'react';
//import ReactDOM from 'react-dom';
import { Marker } from 'google-maps-react';
import car from "./images/car.png";

export class DriverLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drivers: [] };
    }

    callAPI() {
        let self = this;
        fetch('http://localhost:5000/driver/get', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ drivers: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    };

    componentWillMount() {
        this.callAPI();
    };

    renderDrivers() {
        this.state.drivers.map(driver =>
            <Marker key={driver.driverID} onClick={this.onMarkerClick} name={driver.firstname}
                position={{ lat: driver.currentLat, lng: driver.currentLong}} />
        )
    }
}

export default DriverLocations;
