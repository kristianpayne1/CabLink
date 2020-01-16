import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class HomeCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./images/solid-bg.png')}
                        alt="First slide"
                        height='400px'
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Something about how easy it is to book cabs with cablink.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./images/solid-bg.png')}
                        alt="Third slide"
                        height='400px'
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Something about saving money with cablink.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./images/solid-bg.png')}
                        alt="Third slide"
                        height='400px'
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Something else thats cool.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default HomeCarousel;
