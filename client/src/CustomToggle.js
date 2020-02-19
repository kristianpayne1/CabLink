import React from 'react';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Button from 'react-bootstrap/Button';

function CustomToggle({eventKey, disabled, content, showDrivers}) {

    const stuff = useAccordionToggle(eventKey, () => {
        if(showDrivers) {
            showDrivers();
        }
    });

    return (
        <Button
            variant="outline-primary"
            disabled={disabled}
            onClick={stuff}
            block
            size='sm'>
            {content}
        </Button>
    );
}

export default CustomToggle;