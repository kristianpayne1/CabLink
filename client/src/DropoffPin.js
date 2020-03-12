import React from 'react';
import './CurrentMarker.css';

const DropoffMarker = (props) => {
    const { color, name} = props;
    return (
      <div className="markerDO"
        style={{cursor: 'pointer'}}
        title={"Drop-Off Location"}
      />
    );
  };
 
export default DropoffMarker;
