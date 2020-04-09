import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import './PickUpInfo.css';
import { Link } from "react-router-dom";

class PickupInfo extends Component {
    state = {
        hover: false,
    }

    // when user hovers over pick up info
    onHover = () => {
        this.setState({hover: !this.state.hover});
    }

    render() {
        // if pickup complete set progress bar to green and max otherwise set it to in progress blue
        let progressbar = !(this.props.info.progress === 100) ? <ProgressBar animated now={this.props.info.progress} /> : <ProgressBar variant="success" now={this.props.info.progress} />;
        // if driver is in standby set progress bar to yellow and max otherwise set progress bar tp in progress blue
        let standyProgress = this.props.info.standby === true ? <ProgressBar variant="warning" now={100} /> : progressbar;
        // if pickup has been cancelled set progress bar to max red and max otherise set to standby
        let cancelledProgress = this.props.cancelled ? <ProgressBar variant="danger" now={100} /> : standyProgress;
        // when pickup is complete change text to 'driver arrived' otherwise 'in progress'
        let status = !(this.props.info.progress === 100) ?
            <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} is on their way!</h5> :
            <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} has arrived!</h5>;
        // if driver is on standby 'Driver is in standby" otherwise set text to "on it's way"
        let standby = this.props.info.standby === true ? <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} is on standby</h5> :
            status;
        // if user hasn't cancelled pickup show standby otherwise set test to 'you have cancelled'
        let cancelled= this.props.cancelled ? <h5 className="pickupInfoTitle">You've cancelled with {this.props.info.driver.firstname} from {this.props.info.companyName}</h5> : standby;
        // if pickup complete set to green else blue
        let spinnerInProgress = !(this.props.info.progress === 100) ? "primary" : "success";
        // if driver in standby set yellow else in progress
        let spinnerStandby = this.props.info.standby ? "warning" : spinnerInProgress;
        // if user hasn't cancelled set red else standby
        let spinnerCancelled = this.props.cancelled ? "danger" : spinnerStandby
        // if pickup not complete display when driver will be arriving
        let departby = (this.props.pickupDate && !(this.props.info.progress === 100) && !(this.props.cancelled)) ? "Depart By: " + this.props.pickupDate.getHours() + ':' + (this.props.pickupDate.getMinutes()<10?'0':'') + this.props.pickupDate.getMinutes() : null;
        // sets the driver telephone so button can call it
        let telephone = "tel: " + this.props.info.mobileNo;
        // when user hovers over pickup info box show call and cancel buttons
        let buttons = this.state.hover ? <div className="buttons"><Button className="leftB" variant="outline-info" href={telephone}>Call</Button>{' '}<Button className="rightB" variant="outline-danger" onClick={this.props.handleCancelBooking}>Cancel</Button></div> : null;
        // if user has cancelled or pickup complete don't show cancel and call buttons and instead show home button
        let cancelledButtons = ((this.props.cancelled || this.props.info.progress === 100) && this.state.hover) ? <div className="buttons"><Button variant="outline-primary"  as={Link} to="/proj/co600/project/c37_cablink/">Return home</Button></div> : buttons;
        return (
            <div className="pickupinfo" onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
                <div>
                    {cancelledProgress}
                </div>
                <div className="container">
                    {cancelled}
                    <p className="info">{this.props.info.car} <b>{this.props.info.reg}</b></p>
                    <p className="departTime">{departby}</p>
                </div>
                <div className="spinnerContainer">
                    <Spinner className="spinner" animation="grow" variant={spinnerCancelled} />
                </div>
                {cancelledButtons}
            </div>
        );
    }

}

export default PickupInfo;
