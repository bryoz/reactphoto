import React from "react";
import { graphql, Link, StaticQuery, } from "gatsby"

import { FaInstagram } from "react-icons/fa"

import * as styles from "./Links.module.scss"
import classNames from "classnames/bind"


export default function Links(props) {

    const cx = classNames.bind(styles)

    const classes = cx(
        "wrapper",
        props.isMenu ? "menu" : null
    );

    return (
        <StaticQuery
            query={graphql`
                query LinksQuery {
                    site {
                        siteMetadata {
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
                <nav className={classes}>
                    <ul className={styles.links}>
                        <li>
                            <Link
                                to="/"
                                className={styles.link}
                                activeClassName={styles.active}
                            >
                                Latest
                            </Link>
                        </li>
                        
                        {data.site.siteMetadata.aggregateGallery ?
                            <li>
                                <Link
                                    to="/photos"
                                    className={styles.link}
                                    activeClassName={styles.active}
                                    partiallyActive={true}
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
                                    activeClassName={styles.active}
                                    partiallyActive={true}
                                >
                                    {folder.fieldValue}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/about"
                                className={styles.link}
                                activeClassName={styles.active}
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
                        {data.site.siteMetadata.instagram && data.site.siteMetadata.instagram.length > 0 && !props.isMenu &&
                            <li>
                                <a
                                    href={`https://instagram.com/${data.site.siteMetadata.instagram}`}
                                    className={cx("link", "ig")}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaInstagram />
                                </a>
                            </li>
                        }
                    </ul>
                </nav>
            )}
        />
    )
}