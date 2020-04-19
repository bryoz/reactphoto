import React from 'react';
import Gallery from '../../components/gallery/Gallery';

import { mostRecent } from '../../data';
import styles from './Latest.module.scss';

export default class Latest extends React.PureComponent {

    render() {
        // Changing data pattern to meet expectations of Gallery.jsx
        const photos = mostRecent.map(id => ({ id }));
        const data = { children: photos };

        return (
            <React.Fragment>
                <div className={styles.wrapper}>
                    <Gallery data={data} />
                </div>
            </React.Fragment>
        );
    }

}