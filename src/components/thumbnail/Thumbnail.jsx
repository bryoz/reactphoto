import React, { useState } from 'react';

import { ThreeDots } from 'svg-loaders-react';

import styles from './Thumbnail.module.scss';

const Thumbnail = ({
    photo,
    left,
    top,
    margin
}) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={styles.wrapper}
            style={{
                margin,
                top: top,
                left: left,
                height: photo.height,
                width: photo.width
            }}
        >
            {loaded ? null : (
                <div className={styles.loading}>
                    <ThreeDots />
                </div>
            )}

            <img
                className={styles.image}
                {...photo}
                style={loaded ? {} : {display: 'none'}}
                alt={photo.alt}
                onLoad={() => setLoaded(true)}
            />
                {photo.name && loaded &&
                    <div className={styles.name}>
                        <span className={styles.text}>{photo.name}</span>
                    </div>
                }
        </div>
    );
};

export default Thumbnail;