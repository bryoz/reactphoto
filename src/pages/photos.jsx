import React from "react";
import { graphql, Link, StaticQuery, } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Masonry from "react-masonry-css";
import GalleryThumbnail from "../components/gallery-thumbnail"
import Layout from "../components/layout"

import * as styles from "./photos.module.scss"

const getGroupedData = (data = []) => {
    const groups = new Map();
    for (const item of data) {
        const [topLevel] = [ ...item.fieldValue.split('/') ];

        if (!groups.has(topLevel)) {
            groups.set(topLevel, { fieldValue: topLevel, edges: item.edges });
        }
    }
    return [ ...groups.values() ];
};

export default function Photos() {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }

    return (
        <StaticQuery
            query={graphql`
                query DirectoryQuery { 
                    allFile(
                        filter: {
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
                }
            `}

            render={data => (
                <Layout>
                    {data.allFile.group && data.allFile.group.length ?
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className={styles.wrapper}
                            columnClassName={styles.column}
                        >

                            {getGroupedData(data.allFile.group).map(function(folder) {
                                const image = getImage(folder.edges[0].node.children[0].gatsbyImageData)

                                return (
                                    <div
                                        className={styles.collection}
                                        key={folder.fieldValue}
                                    >
                                        <Link
                                            to={`/photos/${folder.fieldValue.replace(/\s/g, "-").toLowerCase()}`}
                                            className={styles.collectionLink}
                                        >
                                            <GalleryThumbnail
                                                name={folder.fieldValue}
                                                photo={image}
                                            />
                                        </Link>
                                        <h3 className={styles.collectionTitle}>
                                            <Link
                                                to={`/photos/${folder.fieldValue.replace(/\s/g, "-").toLowerCase()}`}
                                                className={styles.collectionTitleLink}
                                            >
                                                {folder.fieldValue}
                                            </Link>
                                        </h3>
                                    </div>
                                )
                            })}
                        </Masonry>
                        :
                        <p>Please add folders/images to your media directory</p>
                    }
                </Layout>
            )}
        />
    )
}