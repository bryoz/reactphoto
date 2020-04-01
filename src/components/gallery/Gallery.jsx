import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Gallery from 'react-photo-gallery';
import Heading from '../heading/Heading';
import Thumbnail from '../thumbnail/Thumbnail';
import { Link } from 'react-router-dom';

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

    console.log(isWideLayout)

    const photos = props.data.children.map(photo => ({
        key: photo.name,
        src: require('../../media' + photo.src),
        width: 1,
        height: photo.meta.height / photo.meta.width,
        slug: photo.slug,
    }));

    return (
        <React.Fragment>

            <Heading tag="h2">{props.data.name}</Heading>

            <div className={styles.wrapper}>
                <Gallery 
                    direction="column" 
                    photos={photos} 
                    columns={isWideLayout ? 3 : 2} 
                    renderImage={thumbnail} 
                    margin={isWideLayout ? 10 : 5}
                />
            </div>

        </React.Fragment>
    );
}
