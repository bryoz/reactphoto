import React from 'react';
import Gallery from 'react-photo-gallery';
import Heading from '../heading/Heading';
import Thumbnail from '../thumbnail/Thumbnail';
import { Link } from 'react-router-dom';

const columns = (containerWidth) => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
};

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

            <Gallery 
                direction="column" 
                photos={photos} 
                columns={columns} 
                renderImage={thumbnail} 
                margin={10} 
            />

        </React.Fragment>
    );
}
