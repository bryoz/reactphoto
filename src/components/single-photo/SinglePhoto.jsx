import React, { useState } from 'react';
import Heading from '../heading/Heading';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Return from '../return/Return';
import { getPhotoById, getFileByPath } from '../../helpers/photos';
import { ThreeDots } from 'svg-loaders-react';

import styles from './SinglePhoto.module.scss';

export default function SinglePhoto(props) {

    const [loaded, setLoaded] = useState(false);

    const photo = getPhotoById(props.data.id);
    const src = getFileByPath(photo.src);
    const meta = photo.meta;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Breadcrumb />

                <Heading tag="h2">
                    {(meta.iptc && meta.iptc.headline) ?
                        meta.iptc.headline : photo.name
                    }
                </Heading>
            </div>

            {loaded ? null : (
                <div className={styles.loading}>
                    <ThreeDots />
                </div>
            )}

            <img
                src={src}
                className={styles.image}
                style={loaded ? {} : {display: 'none'}}
                onLoad={() => setLoaded(true)}
                alt=""
            />

            {(meta.iptc && meta.iptc.caption) && loaded &&
                <p className={styles.caption}>{meta.iptc.caption}</p>
            }

            <Return />
        </div>
    );
}
