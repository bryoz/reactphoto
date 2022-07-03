import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import GalleryThumbnail from "../components/gallery-thumbnail"
import PhotoHandler from "../components/photo-handler"

import Breadcrumb from "../components/breadcrumb"

import * as styles from "./PhotoIndex.module.scss"

export default function PhotoIndex({ data }) {
    const gallery = data.file.relativeDirectory
    const photos = data.allFile.edges
    const thumbs = data.thumbs.group

    var folderArray = data.file.relativeDirectory.split("/")
    var folder = folderArray.slice(0, folderArray.length - 1).join("/")

    return (
        <Layout>
            <Breadcrumb 
                link={`/${folder.replace(/\s/g, "-").toLowerCase()}`}
                name={folder}
            />

            <h1>{gallery}</h1>
            {thumbs && thumbs.length > 0 &&
                <div className={styles.collectionsWrapper}>
                    <h2>Collections within {gallery}</h2>
                    <ul className={styles.collections}>
                        {thumbs.map(function(thumb){
                            thumb = thumb.edges[0].node
                            const link = "/" + thumb.relativeDirectory.replace(/\s/g, "-").toLowerCase()

                            return (
                                <li
                                    className={styles.collection}
                                    key={link}
                                >
                                    <Link
                                        to={link}
                                        className={styles.collectionLink}
                                    >
                                        <GalleryThumbnail
                                            name={thumb.relativeDirectory.split('/').pop()}
                                            photo={thumb.childImageSharp.gatsbyImageData}
                                        />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }

            

            <h2>Photos within {gallery}</h2>
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
                edges {
                    node {
                        relativeDirectory
                        name
                        childImageSharp {
                            gatsbyImageData(
                                height: 400,
                                width: 400,
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