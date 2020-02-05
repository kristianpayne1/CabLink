import React, { Component } from 'react';
import DriverCard from './DriverCard.js';

class DriverListing extends Component {

    listDrivers() {
        return (
            this.props.drivers.map((driver, i) =>
                <div key={i}>
                    <DriverCard
                        name={driver.firstname + ' ' + driver.lastname}
                        company='Example company'
                        mobileNo={driver.mobileNo}
                        key={i}
                    />
                    <br />
                </div>
            )
        )
    }

    render() {
        return (
            <div>
                {this.listDrivers()}
            </div>
        );
    }
}

export default DriverListing;
