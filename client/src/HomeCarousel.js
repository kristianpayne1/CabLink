import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class HomeCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./images/cab-interior.png')}
                        alt="Cab Interior"
                        height='400px'
                    />
                    <Carousel.Caption>
                        <h3>Book cabs with ease</h3>
                        <p>Book your journey on the move with our app.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./images/cab-exterior.png')}
                        alt="Cab Exterior"
                        height='400px'
                    />

                    <Carousel.Caption>
                        <h3>Competitive Prices</h3>
                        <p>Our service provides as many different quotes as possible, giving you the best value for money!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./images/street-overhead.png')}
                        alt="Third slide"
                        height='400px'
                    />

                    <Carousel.Caption>
                        <h3>Journey Flexibility</h3>
                        <p>Our service allows you to stop off along the way during your journey!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default HomeCarousel;
