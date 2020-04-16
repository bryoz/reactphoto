import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Gallery from 'react-photo-gallery';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Heading from '../heading/Heading';
import Thumbnail from '../thumbnail/Thumbnail';
import { Link, useLocation } from 'react-router-dom';
import { getPhotoById, getFileByPath } from '../../helpers/photos';

import styles from './Gallery.module.scss';

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

export default function PhotoGallery (props) {
    const isWideLayout = useMediaQuery({
        query: '(min-width: 768px)'
    })

    const location = useLocation();
    const isHome = location.pathname === "/";

    const photos = props.data.children
        .map(photo => getPhotoById(photo.id))
        .map(photo => ({
            key: photo.name,
            src: getFileByPath(photo.src),
            width: 1,
            height: photo.meta.height / photo.meta.width,
            slug: photo.slug,
        }));

    return (
        <div className={styles.wrapper}>

            {!isHome &&
                <div className={styles.header}>
                    <Breadcrumb />
                    <Heading tag="h2">{props.data.name}</Heading>
                </div>
            }
            
            <div className={styles.content}>
                <Gallery 
                    direction="column" 
                    photos={photos} 
                    columns={isWideLayout ? 3 : 2} 
                    renderImage={thumbnail} 
                    margin={isWideLayout ? 10 : 5}
                />
            </div>
        </div>
    );
}
