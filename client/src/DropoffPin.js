import React from 'react';
import './CurrentMarker.css';

const DropoffMarker = (props) => {
    const { color, name} = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };
 
export default DropoffMarker;
