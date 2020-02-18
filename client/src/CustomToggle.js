import React from 'react';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Button from 'react-bootstrap/Button';

function CustomToggle({eventKey, disabled, content}) {

    const stuff = useAccordionToggle(eventKey, () =>
        console.log('toggling accordian'));

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