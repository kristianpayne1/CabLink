import React from 'react';
import './CurrentMarker.css';

const PickupMarker = (props) => {
    const { color, name} = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={"Pick-Up Location"}
      />
    );
  };
 
export default PickupMarker;
