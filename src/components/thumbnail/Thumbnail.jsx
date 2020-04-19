import React from 'react';

import styles from './Thumbnail.module.scss';

const Thumbnail = ({
    photo,
    left,
    top,
    margin
}) => {

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
            <img
                className={styles.image}
                {...photo}
                alt={photo.alt}
            />
                {photo.name &&
                    <div className={styles.name}>
                        <span className={styles.text}>{photo.name}</span>
                    </div>
                }
        </div>
    );
};

export default Thumbnail;