import "./Carousel.css";
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class HomeCarousel extends Component {
    render() {
        return (
            <Carousel id="container">
                <Carousel.Item>
                    <img
                        src={require('./images/cab-interior.png')}
                        alt="Cab Interior"
                        id="caroimg"
                    />
                    <Carousel.Caption>
                        <h3 id="carohead">Book cabs with ease</h3>
                        <p id="carop">Book your journey on the move with our app.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={require('./images/cab-exterior.png')}
                        alt="Cab Exterior"
                        id="caroimg"
                    />
                    <Carousel.Caption>
                        <h3 id="carohead">Competitive Prices</h3>
                        <p id="carop">Our service provides you the best value for money!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={require('./images/street-overhead.png')}
                        alt="Third slide"
                        id="caroimg"
                    />
                    <Carousel.Caption id="carocap">
                        <h3 id="carohead">Journey Flexibility</h3>
                        <p id="carop">Our service allows you to stop off along the way during your journey!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default HomeCarousel;
