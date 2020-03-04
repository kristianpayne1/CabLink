import React from 'react';
import './CurrentMarker.css';

const ExtraStopPin = (props) => {
    const { color, name} = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={"Extra Stop"}
      />
    );
  };
 
export default ExtraStopPin;
