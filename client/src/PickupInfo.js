import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import './PickUpInfo.css';
class PickupInfo extends Component {
    state = {
        hover: false,
    }

    onHover = () => {
        this.setState({hover: !this.state.hover});
    }

    render() {
        let progressbar = !(this.props.info.progress === 100) ? <ProgressBar animated now={this.props.info.progress} /> : <ProgressBar variant="success" now={this.props.info.progress} />;
        let standyProgress = this.props.info.standby === true ? <ProgressBar variant="warning" now={100} /> : progressbar;
        let cancelledProgress = this.props.cancelled ? <ProgressBar variant="danger" now={100} /> : standyProgress;
        let status = !(this.props.info.progress === 100) ?
            <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} is on their way!</h5> :
            <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} has arrived!</h5>;
        let standby = this.props.info.standby === true ? <h5 className="pickupInfoTitle">{this.props.info.driver.firstname} from {this.props.info.companyName} is on standby</h5> :
            status;
        let cancelled= this.props.cancelled ? <h5 className="pickupInfoTitle">You've cancelled with {this.props.info.driver.firstname} from {this.props.info.companyName}</h5> : standby;
        let spinnerInProgress = !(this.props.info.progress === 100) ? "primary" : "success";
        let spinnerStandby = this.props.info.standby ? "warning" : spinnerInProgress;
        let spinnerCancelled = this.props.cancelled ? "danger" : spinnerStandby
        let departby = (this.props.pickupDate && !(this.props.info.progress === 100) && !(this.props.cancelled)) ? "Depart By: " + this.props.pickupDate.getHours() + ':' + (this.props.pickupDate.getMinutes()<10?'0':'') + this.props.pickupDate.getMinutes() : null;
        let buttons = this.state.hover ? <div className="buttons"><Button className="leftB" variant="outline-info">Call</Button>{' '}<Button className="rightB" variant="outline-danger" onClick={this.props.handleCancelBooking}>Cancel</Button></div> : null;
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
                {buttons}
            </div>
        );
    }

}

export default PickupInfo;
