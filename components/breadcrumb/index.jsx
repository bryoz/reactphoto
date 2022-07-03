import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby"

import * as styles from "./Breadcrumb.module.scss"

export default function Breadcrumb(props) {
    const data = useStaticQuery(graphql` {
        site {
            siteMetadata {
                aggregateGallery
                galleryTitle
            }
        }
    }`);

    return (
        <div className={styles.wrapper}>
            {props.name.length > 0 && props.link.length > 1 ?
                <Link
                    to={props.link}
                >
                    {props.name}
                </Link>
            : data.site.siteMetadata.aggregateGallery === true && data.site.siteMetadata.galleryTitle.length > 0 ?
                <Link
                    to={`/photos`}
                >
                    {data.site.siteMetadata.galleryTitle}
                </Link>
            : null }
        </div>
    )
}

