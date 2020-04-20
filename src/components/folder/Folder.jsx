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
    const photos = props.data.children.map(photo => ({
        key: photo.name,
        src: photo.thumbnail,
        width: 1,
        height: 1,
        slug: photo.slug,
        name: photo.name,
    }));

    const is2col = useMediaQuery({
        query: '(min-width: 480px)'
    });

    const is3col = useMediaQuery({
        query: '(min-width: 768px)'
    });

    const is4col = useMediaQuery({
        query: '(min-width: 1920px)'
    })

    let columns = 1;

    if(is4col) {
        columns = 4;
    } else if(is3col) {
        columns = 3;
    } else if(is2col) {
        columns = 2;
    } else {
        columns = 1
    }

    if(columns > photos.length) {
        columns = photos.length;
    }

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
                        columns={columns} 
                        renderImage={thumbnail} 
                        margin={is3col ? 10 : 5}
                    />
                </div>
            </div>
        </div>
    );
}