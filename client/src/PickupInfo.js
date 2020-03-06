import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';

class PickupInfo extends Component {

    render() {
        let progressbar = !(this.props.info.progress === 100) ? <ProgressBar animated now={this.props.info.progress} /> : <ProgressBar variant="success" now={this.props.info.progress} />;
        let standyProgress = this.props.info.standby === true ? <ProgressBar variant="warning" now={100} /> : progressbar;
        let status = !(this.props.info.progress === 100) ?
            <h5 className="pickupInfoTitle">{this.props.info.driverName} from {this.props.info.companyName} is on their way!</h5> :
            <h5 className="pickupInfoTitle">{this.props.info.driverName} from {this.props.info.companyName} has arrived!</h5>;
        let standby = this.props.info.standby === true ? <h5 className="pickupInfoTitle">{this.props.info.driverName} from {this.props.info.companyName} is on standby</h5> :
            status;
        let spinnerInProgress = !(this.props.info.progress === 100) ? "primary" : "success";
        let spinnerStandby = this.props.info.standby ? "warning" : spinnerInProgress;
        let departby = (this.props.pickupDate && !(this.props.info.progress === 100)) ? "Depart by: " + this.props.pickupDate.getHours() + ':' + (this.props.pickupDate.getMinutes()<10?'0':'') + this.props.pickupDate.getMinutes() : null;
        return (
            <div className="pickupinfo">
                <div>
                    {standyProgress}
                </div>
                <div style={{ 'float': 'left' }}>
                    {standby}
                    <p style={{ 'marginBlockStart': '0.1rem', 'marginBlockEnd': '0.1rem', 'marginLeft': '0.5rem', 'width':'98%' }}>{this.props.info.car} <b>{this.props.info.reg}</b> <span style={{'float':'right'}}><b>{departby}</b></span></p>
                </div>
                <div style={{ 'float': 'right', "marginRight": "2%" }}>
                    <Spinner animation="grow" variant={spinnerStandby} style={{ "width": "3rem", "height": "3rem" }} />
                </div>
            </div>
        );
    }

}

export default PickupInfo;
