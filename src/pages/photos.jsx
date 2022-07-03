import React from "react";
import { graphql, Link, StaticQuery, } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import GalleryThumbnail from "../components/gallery-thumbnail"
import Layout from "../components/layout"

import * as styles from "./photos.module.scss"

export default function Photos() {
    return (
        <StaticQuery
            query={graphql`
                query DirectoryQuery {
                    allFile(
                        filter: {
                            relativeDirectory: {regex: "/^[^\/]+$/"},
                            sourceInstanceName: {eq: "media"}
                        }
                    ) {
                        group (
                            field: relativeDirectory,
                            limit: 1
                        ) {
                            fieldValue
                            edges {
                                node {
                                    name
                                    children {
                                        ... on ImageSharp {
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
                }
            `}

            render={data => (
                <Layout>
                    <div className={styles.wrapper}>
                        {data.allFile.group && data.allFile.group.length ?
                            <ul className={styles.collections}>
                                {data.allFile.group.map(function(folder){
                                    const image = getImage(folder.edges[0].node.children[0].gatsbyImageData)

                                    return (
                                        <li 
                                            className={styles.collection}
                                            key={folder.fieldValue}
                                        >
                                            <Link
                                                to={`/${folder.fieldValue.replace(/\s/g, "-").toLowerCase()}`}
                                                className={styles.collectionLink}
                                            >
                                                <GalleryThumbnail
                                                    name={folder.fieldValue}
                                                    photo={image}
                                                />
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        :
                            <p>Please add folders/images to your media directory</p>
                        }
                    </div>
                </Layout>
            )}
        />
    )
}