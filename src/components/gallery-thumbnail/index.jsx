import React from "react";
import * as styles from "./GalleryThumbnail.module.scss"

export default function GalleryThumbnail({ src, width, height, name }) {
    return (
        <div className={styles.wrapper}>
            <img
                src={src}
                alt={name || ""}
                width={width}
                height={height}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </div>
    )
}
