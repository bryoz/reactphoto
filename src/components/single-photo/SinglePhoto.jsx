import React from 'react';
import Heading from '../heading/Heading';

export default function SinglePhoto(props) {

    const src = require('../../media' + props.data.src); 
    const meta = JSON.stringify(props.data.meta, null, 4);

    return (
        <React.Fragment>
            
            <Heading tag="h2">{props.data.name}</Heading>
            <img src={src} />

            <Heading tag="h4">Meta</Heading>
            <pre>{meta}</pre>

        </React.Fragment>
    );
}
