import React, { Component } from 'react';
import DriverCard from './DriverCard.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class DriverListing extends Component {

    handleOnHover = (driver) => {
        this.props.showDriver(driver.currentLat, driver.currentLong);
    }

    listDrivers() {
        return (
            this.props.drivers.map((driver, i) =>
                <div key={i}>
                    <DriverCard
                        name={driver.firstname + ' ' + driver.lastname}
                        company='Example company'
                        mobileNo={driver.mobileNo}
                        key={i}
                        driver={driver}
                        handleOnHover={this.handleOnHover}
                    />
                    <br />
                </div>
            )
        )
    }

    render() {
        return (
            <div>
                <DropdownButton
                    key='dropdown'
                    id={'sortby-dropdown'}
                    size="sm"
                    variant="secondary-light"
                    title="Sort by"
                >
                    <Dropdown.Item eventKey="1">Recommended</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Fastest response</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Lowest price</Dropdown.Item>
                </DropdownButton>
                {this.listDrivers()}
            </div>
        );
    }
}

export default DriverListing;
