import React from 'react';
//import ReactDOM from 'react-dom';
import DriverPin from './DriverPin.js';

export class DriverLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drivers: [] };
    }

    callAPI() {
        let self = this;
        fetch('http://localhost:4000/driver/get', {
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

    componentDidMount() {
        this.callAPI();
    };

    render() {
        return(
        this.state.drivers.map(driver =>
            <DriverPin
                lat={driver.currentLat}
                lng={driver.currentLong}
                name={driver.firstname}
                color="black"
                key={driver.driverID}
            />
        )
        )
    }
}

export default DriverLocations;
