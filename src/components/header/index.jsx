import React from "react";
import { graphql, Link, StaticQuery, } from "gatsby"

import { FaInstagram } from "react-icons/fa"

import * as styles from "./Header.module.scss"

export default function Header() {

    return (
        <StaticQuery
            query={graphql`
                query HeadingQuery {
                    site {
                        siteMetadata {
                            title
                            instagram
                            aggregateGallery
                            galleryTitle
                            storeName
                            storeUrl
                        }
                    }
                    allDirectory (
                        filter: {
                            sourceInstanceName: {eq: "media"},
                            name: {ne: "media"},
                            relativeDirectory: {eq: ""}
                        }
                    ) {
                        edges {
                            node {
                                name
                                relativePath
                            }
                        }
                    }
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
                                }
                            }
                        }
                    }
                }
            `}
            render={data => (
                <header
                    className={styles.wrapper}
                >
                    <h1>{data.site.siteMetadata.title}</h1>

                    <nav className={styles.navigation}>
                        <ul className={styles.links}>
                            <li>
                                <Link
                                    to="/"
                                    className={styles.link}
                                >
                                    Home
                                </Link>
                            </li>
                            
                            {data.site.siteMetadata.aggregateGallery ?
                                <li>
                                    <Link
                                        to="/photos"
                                        className={styles.link}
                                    >
                                        {data.site.siteMetadata.galleryTitle}
                                    </Link>
                                </li>
                            : data.allFile.group.map(folder => ( 
                                <li
                                    key={folder.fieldValue}
                                >
                                    <Link
                                        to={`/${folder.fieldValue.replace(/\s/g, "-").toLowerCase()}`}
                                        className={styles.link}
                                    >
                                        {folder.fieldValue}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/about"
                                    className={styles.link}
                                >
                                    About
                                </Link>
                            </li>
                            {data.site.siteMetadata.storeUrl && data.site.siteMetadata.storeUrl.length > 0 &&
                                <li>
                                    <Link
                                        to={data.site.siteMetadata.storeUrl}
                                        className={styles.link}
                                    >
                                        {data.site.siteMetadata.storeName}
                                    </Link>
                                </li>
                            }
                            {data.site.siteMetadata.instagram && data.site.siteMetadata.instagram.length > 0 &&
                                <li>
                                    <Link
                                        to={`https://instagram.com/${data.site.siteMetadata.instagram}`}
                                        className={styles.link}
                                    >
                                        <FaInstagram />
                                    </Link>
                                </li>
                            }
                        </ul>
                    </nav>
                </header>
            )}
        />
    )
}