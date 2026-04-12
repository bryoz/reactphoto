import React from "react";
import { FaInstagram } from "react-icons/fa"

import * as styles from "./Links.module.scss"
import classNames from "classnames/bind"


export default function Links({ config, folders, isMenu, onClick }) {
    const cx = classNames.bind(styles)

    const classes = cx(
        "wrapper",
        isMenu ? "menu" : null
    );

    return (
        <nav className={classes}>
            <ul className={styles.links}>
                <li>
                    <a href="/" className={styles.link} onClick={onClick}>
                        Latest
                    </a>
                </li>

                {config.aggregateGallery ?
                    <li>
                        <a href="/photos" className={styles.link} onClick={onClick}>
                            {config.galleryTitle}
                        </a>
                    </li>
                : folders.map(folder => (
                    <li key={folder.name}>
                        <a
                            href={`/photos/${folder.slug}`}
                            className={styles.link}
                            onClick={onClick}
                        >
                            {folder.name}
                        </a>
                    </li>
                ))}
                <li>
                    <a href="/about" className={styles.link} onClick={onClick}>
                        About
                    </a>
                </li>
                {config.storeUrl && config.storeUrl.length > 0 &&
                    <li>
                        <a href={config.storeUrl} className={styles.link} onClick={onClick}>
                            {config.storeName}
                        </a>
                    </li>
                }
                {config.instagram && config.instagram.length > 0 && !isMenu &&
                    <li>
                        <a
                            href={`https://instagram.com/${config.instagram}`}
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
    )
}
