import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
    Fa500Px,
    FaBehance,
    FaDeviantart,
    FaDribbble,
    FaFacebook,
    FaFlickr,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaPatreon,
    FaTwitch,
    FaTwitter,
    FaVimeo,
    FaYoutube
} from "react-icons/fa"

import classNames from "classnames/bind"
import * as styles from "./Social.module.scss"

const cx = classNames.bind(styles)

const IconRetrieve = ({ icon }) => {
    const mapIcons = new Map([
        ['500px', <Fa500Px />],
        ['behance', <FaBehance />],
        ['deviantart', <FaDeviantart />],
        ['dribbble', <FaDribbble />],
        ['facebook', <FaFacebook />],
        ['flickr', <FaFlickr />],
        [`github`, <FaGithub />],
        [`linkedin`, <FaLinkedin />],
        ['patreon', <FaPatreon />],
        ['twitch', <FaTwitch />],
        [`twitter`, <FaTwitter />],
        ['vimeo', <FaVimeo />],
        ['youtube', <FaYoutube />],
    ])
    return mapIcons.has(icon) ? mapIcons.get(icon) : mapIcons.get('default')
}

export default function Header() {
    const data = useStaticQuery(graphql` {
        site {
            siteMetadata {
                instagram
                social {
                    name
                    title
                    url
                }
            }
        }
    }`);

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {data.site.siteMetadata.instagram &&
                    <li className={cx("item", "instagram")}>
                        <a
                            className={styles.link} 
                            href={`https://instagram.com/${data.site.siteMetadata.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                        </a>
                    </li>
                }
                {data.site.siteMetadata.social.map((item) =>(
                    (item.url && item.url.length > 0) ?
                    <li key={item.name} className={cx("item", item.name)}>
                        <a 
                            className={styles.link}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconRetrieve icon={item.name} />
                        </a>
                    </li>
                    : null
                ))}
            </ul>
        </div>
    )
}