import React from 'react';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Button from 'react-bootstrap/Button';

// custom button for toggling accordian used in sidebar
function CustomToggle({ eventKey, disabled, content, showDrivers, variant, block, size}) {

    // set accordian event 
    const toggle = useAccordionToggle(eventKey, () => {
        if (showDrivers) {
            showDrivers();
        }
    });

    return (
        <Button
            variant={variant}
            disabled={disabled}
            onClick={toggle}
            size={size}
            block={block}
        >
            {content}
        </Button>
    );
}

export default CustomToggle;