import React from 'react';
import './CurrentMarker.css';

const DriverMarker = (props) => {
    const {name} = props;
    return (  
      <div className="markerD"
        style={{cursor:'pointer'}}
        title={name}
      />
    );
  };
 
export default DriverMarker;
