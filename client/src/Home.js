import React, { Component } from 'react';
import HomeCarousel from './HomeCarousel.js';
import './Home.css';
import Button from 'react-bootstrap/Button';

class Home extends Component {
    render() {
        return (
            <div>
                <HomeCarousel/>
                <div>
                    <h1 id="intro">What We Do</h1>
                    <p id="desc">CabLink provides an innovative service, allowing people to easily find and compare cab companies in one place. This allows users to save money, time and the stress of arranging transportation throughout the Canterbury area.</p>
                    <Button id ="bookbutton" variant="outline-primary" href="./booking">Book Cab</Button>
                </div>
            </div>
        );
    }
}

export default Home;