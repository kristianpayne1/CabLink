import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import GoogleMap from './map.js';
import NavBar from './NavBar.js';

class App extends Component {
 
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <GoogleMap/>
      </div>
    );
  }
}
 
export default App;
