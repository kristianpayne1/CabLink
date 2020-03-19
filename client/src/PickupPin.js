import React from 'react';
import './CurrentMarker.css';

// pick up marker used for map
const PickupMarker = () => {
    return (
      <div className="marker"
        style={{cursor: 'pointer'}}
        title={"Pick-Up Location"}
      />
    );
  };
 
export default PickupMarker;
