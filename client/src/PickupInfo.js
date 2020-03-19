import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './PickUpInfo.css';
class PickupInfo extends Component {

    render() {
        let progressbar = !(this.props.info.progress === 100) ? <ProgressBar animated now={this.props.info.progress} /> : <ProgressBar variant="success" now={this.props.info.progress} />;
        let standyProgress = this.props.info.standby === true ? <ProgressBar variant="warning" now={100} /> : progressbar;
        let status = !(this.props.info.progress === 100) ?
            <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} is on their way!</h5> :
            <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} has arrived!</h5>;
        let standby = this.props.info.standby === true ? <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} is on standby</h5> :
            status;
        let spinnerInProgress = !(this.props.info.progress === 100) ? "primary" : "success";
        let spinnerStandby = this.props.info.standby ? "warning" : spinnerInProgress;
        let departby = (this.props.pickupDate && !(this.props.info.progress === 100)) ? "Depart by: " + this.props.pickupDate.getHours() + ':' + (this.props.pickupDate.getMinutes()<10?'0':'') + this.props.pickupDate.getMinutes() : null;
        return (
            <div className="pickupinfo">
                <div>
                    {standyProgress}
                </div>
                <div className="container">
                    {standby}
                    <p className="info">{this.props.info.car} <b>{this.props.info.reg}</b></p>
                    <p className="departTime">{departby}</p>
                </div>
                <div className="spinnerContainer">
                    <Spinner className="spinner" animation="grow" variant={spinnerStandby} />
                </div>
            </div>
        );
    }

}

export default PickupInfo;
