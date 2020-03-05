import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';

class PickupInfo extends Component {
    
    render() {
        return (
            <div className="pickupinfo">
                <div>
                    <ProgressBar animated now={this.props.info.progress} />
                </div>
                <div style={{ 'float': 'left' }}>
                    <h5 style={{ 'marginBlockStart': '0.1rem', 'marginBlockEnd': '0.1rem', 'marginLeft': '0.5rem' }}>{this.props.info.driverName} from {this.props.info.companyName} is on their way!</h5>
                    <p style={{ 'marginBlockStart': '0.1rem', 'marginBlockEnd': '0.1rem', 'marginLeft': '0.5rem' }}>{this.props.info.car} <b>{this.props.info.reg}</b></p>
                </div>
                <div style={{ 'float': 'right', "marginRight": "5%" }}>
                    <Spinner animation="grow" variant="primary" style={{ "width": "3rem", "height": "3rem" }} />
                </div>
            </div>
        );
    }

}

export default PickupInfo;
