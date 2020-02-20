import React from 'react';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Button from 'react-bootstrap/Button';

function CustomToggle({ eventKey, disabled, content, showDrivers, variant, block, size}) {

    const stuff = useAccordionToggle(eventKey, () => {
        if (showDrivers) {
            showDrivers();
        }
    });

    return (
        <Button
            variant={variant}
            disabled={disabled}
            onClick={stuff}
            size={size}
            block={block}
        >
            {content}
        </Button>
    );
}

export default CustomToggle;