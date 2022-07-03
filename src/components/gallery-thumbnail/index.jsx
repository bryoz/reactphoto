import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./GalleryThumbnail.module.scss"

export default function GalleryThumbnail(props) {
    const image = getImage(props.photo)

    return (
        <div className={styles.wrapper}>
            <GatsbyImage
                image={image}
                alt=""
            />
            <h3>
                {props.name}
            </h3>
        </div>
    )
}

