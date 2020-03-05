import React from 'react';
import './CurrentMarker.css';

const DriverMarker = (props) => {
    const { color, name} = props;
    return (  
      <div className="markerD"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };
 
export default DriverMarker;
