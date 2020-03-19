import React from 'react';
import './CurrentMarker.css';

// drop off marker for map
const DropoffMarker = () => {
    return (
      <div className="markerDO"
        style={{cursor:'pointer'}}
        title={"Drop-Off Location"}
      />
    );
  };
 
export default DropoffMarker;
