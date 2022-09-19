import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Masonry from 'react-masonry-css'
import GalleryThumbnail from "../components/gallery-thumbnail"
import PhotoHandler from "../components/photo-handler"

import Breadcrumb from "../components/breadcrumb"

import * as styles from "./PhotoIndex.module.scss"

export default function PhotoIndex( props ) {
    const photos = props.data.allFile.edges
    const thumbs = props.data.thumbs.group

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }

    let title = props.path.split('/')
    title = title[title.length-1]
    title = title.replace(/-/g, " ")

    return (
        <Layout>
            <Breadcrumb
                location={props.location}
            />

            <h1 className={styles.title}>
                {title}
            </h1>

            {thumbs && thumbs.length > 0 &&
                <div className={styles.collectionsWrapper}>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={styles.wrapper}
                        columnClassName={styles.column}
                    >
                        {thumbs.map(function(thumb){
                            thumb = thumb.edges[0].node
                            const link = "/photos/" + thumb.relativeDirectory.replace(/\s/g, "-").toLowerCase()

                            return (
                                <div
                                    className={styles.collection}
                                    key={link}
                                >
                                    <Link
                                        to={link}
                                        className={styles.collectionLink}
                                    >
                                        <GalleryThumbnail
                                            photo={thumb.childImageSharp.gatsbyImageData}
                                        />
                                        
                                    </Link>
                                    <h3 className={styles.collectionTitle}>
                                        <Link
                                            to={link}
                                            className={styles.collectionTitleLink}
                                        >
                                            {thumb.relativeDirectory.split('/').pop()}
                                        </Link>
                                    </h3>
                                </div>
                            )
                        })}
                    </Masonry>
                </div>
            }

            <PhotoHandler 
                photos={photos}
            />
        </Layout>
    )
}

export const query = graphql`
    query($dir: String!, $dirRegex: String!) {
        file(relativeDirectory: { eq: $dir }, ) {
            relativeDirectory
        }
        allFile(filter: {relativeDirectory: {eq: $dir}}) {
            edges {
                node {
                    childImageSharp {
                        gatsbyImageData(width: 480)
                    }
                    name
                    relativePath
                    fields {
                        slug
                    }
                }
            }
        }
        thumbs: allFile(
            filter: {
                sourceInstanceName: {eq: "media"},
                relativeDirectory: {regex: $dirRegex}
            }
        ) {
            group(field: relativeDirectory, limit: 1) {
                fieldValue
                edges {
                    node {
                        relativeDirectory
                        name
                        childImageSharp {
                            gatsbyImageData(
                                height: 480,
                                width: 480,
                                transformOptions: {
                                    cropFocus: ATTENTION
                                }
                            )
                        }
                    }
                }
            }
        }
    }
`