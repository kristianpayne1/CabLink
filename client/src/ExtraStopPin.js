import React from 'react';
import './CurrentMarker.css';

const ExtraStopPin = (props) => {
    const { color, name} = props;
    return (
      <div className="Emarker"
        style={{ cursor: 'pointer'}}
        title={"Extra Stop"}
      />
    );
  };
 
export default ExtraStopPin;
