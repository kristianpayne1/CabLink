import "./Help.css";
import React, { Component } from 'react';
import HelpAccordion from './HelpAccordion.js';

class Help extends Component {

    render() {
        return(
            <div id="content">
                <h1>Help</h1>
                <HelpAccordion id="helpaccordion"/>
            </div>
        )
    }
}

export default Help;