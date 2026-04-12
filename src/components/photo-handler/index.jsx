import React from "react";
import Masonry from 'react-masonry-css'
import * as styles from "./PhotoHandler.module.scss"

const PhotoHandler = ({ photos }) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.wrapper}
            columnClassName={styles.column}
        >
            {photos.map(function(photo) {
                return (
                    <a
                        className={styles.link}
                        href={`/photos/${photo.slug}`}
                        key={photo.slug}
                    >
                        <img
                            src={photo.src}
                            alt={photo.name}
                            width={photo.width}
                            height={photo.height}
                            loading="lazy"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </a>
                )
            })}
        </Masonry>
    )
};

export default PhotoHandler;
