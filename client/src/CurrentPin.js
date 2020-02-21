import React from 'react';
import './CurrentMarker.css';

const CurrentMarker = (props) => {
    const { color, name} = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };
 
export default CurrentMarker;
