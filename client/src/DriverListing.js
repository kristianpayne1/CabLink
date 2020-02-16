import React, { Component } from 'react';
import DriverCard from './DriverCard.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class DriverListing extends Component {
    state = {
        driverOrder: [],
    };

    handleOnHover = (driver) => {
        this.props.showDriver(driver.currentLat, driver.currentLong);
    }

    listDrivers() {
        return (
            this.props.drivers.map((driver, i) =>
                <div key={i}>
                    <DriverCard
                        name={driver.firstname + ' ' + driver.lastname}
                        company={driver.companyName}
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

    orderDrivers = (orderBy) => {
        switch (orderBy) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
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
                    <Dropdown.Item>Recommended</Dropdown.Item>
                    <Dropdown.Item>Fastest response</Dropdown.Item>
                    <Dropdown.Item>Lowest price</Dropdown.Item>
                </DropdownButton>
                {this.listDrivers()}
            </div>
        );
    }
}

export default DriverListing;
