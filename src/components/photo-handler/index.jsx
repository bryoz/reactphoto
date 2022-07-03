import React from "react";
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// import Masonry from 'react-masonry-component'
// import MasonryInfiniteScroller from 'react-masonry-infinite'
import Masonry from 'react-masonry-css'

import * as styles from "./PhotoHandler.module.scss"

const PhotoHandler = ({ photos }) => {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.wrapper}
            columnClassName={styles.column}
        >
            {photos.map(function(photo){
                photo = photo.node
                const image = getImage(photo)

                return (
                    <Link
                        className={styles.link}
                        to={photo.fields.slug}
                        key={photo.relativePath}
                    >
                        <GatsbyImage
                            image={image}
                            alt={photo.name}
                        />
                    </Link>
                )
            })}
        </Masonry>
    )
};

export default PhotoHandler;