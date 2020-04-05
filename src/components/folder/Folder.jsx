import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-photo-gallery';
import { useMediaQuery } from 'react-responsive';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Thumbnail from '../thumbnail/Thumbnail';
import Heading from '../heading/Heading';

import styles from './Folder.module.scss';

const thumbnail = (props) => {
    return (
        <Link to={props.photo.slug} key={props.key}>
            <Thumbnail
                photo={props.photo}
                index={props.index}
                left={props.left}
                top={props.top}
                margin={props.margin}
            />
        </Link>
    );
};

export default function Folder(props) {
    console.log(props);

    const photos = props.data.children.map(photo => ({
        key: photo.name,
        src: photo.thumbnail,
        width: 1,
        height: 1,
        slug: photo.slug,
        name: photo.name,
    }));

    const isWideLayout = useMediaQuery({
        query: '(min-width: 768px)'
    });

    return ( 
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Breadcrumb />
                <Heading tag="h2">{props.data.name}</Heading>
            </div>

            <div className={styles.content}>
                <div className={styles.gallery}>
                    <Gallery 
                        direction="column" 
                        photos={photos} 
                        columns={isWideLayout ? 3 : 2} 
                        renderImage={thumbnail} 
                        margin={isWideLayout ? 10 : 5}
                    />
                </div>
            </div>
        </div>
    );
}