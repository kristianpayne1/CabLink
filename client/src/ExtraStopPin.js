import React from 'react';
import './CurrentMarker.css';

// extra stop markers for map
const ExtraStopPin = () => {
    return (
      <div className="Emarker"
        style={{ cursor: 'pointer'}}
        title={"Extra Stop"}
      />
    );
  };
 
export default ExtraStopPin;
