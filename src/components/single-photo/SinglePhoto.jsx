import React from 'react';
import Heading from '../heading/Heading';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Return from '../return/Return';
import styles from './SinglePhoto.module.scss';

export default function SinglePhoto(props) {

    const src = require('../../media' + props.data.src); 
    const meta = JSON.stringify(props.data.meta, null, 4);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Breadcrumb />
                <Heading tag="h2">{props.data.name}</Heading>
            </div>

            <img src={src} className={styles.image} alt="" />
            
            <Return />

            <Heading tag="h4">Meta</Heading>
            <pre>{meta}</pre>
        </div>
    );
}
