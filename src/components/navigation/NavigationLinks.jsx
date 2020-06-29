import React from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// JSX Imports
import { NavLink } from 'react-router-dom';

// Resources
import { config } from '../../data';
import styles from './Navigation.module.scss';

// Constants
const cx = classNames.bind(styles); 

export default function Links(props) {
    library.add(faInstagram);

    return(
        <nav className={styles.content}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NavLink
                        className={styles.link}
                        activeClassName={styles.active}
                        exact
                        to="/"
                        onClick={props.onClick}
                    >
                        Latest
                    </NavLink>
                </li>
                {props.pages.map((page) =>(
                    <li className={styles.item} key={page.name}>
                        <NavLink
                            className={styles.link}
                            activeClassName={styles.active}
                            strict
                            to={page.slug}
                            onClick={props.onClick}
                        >
                            {page.name}
                        </NavLink>
                    </li>
                ))}
                <li className={styles.item}>
                    <NavLink
                        className={styles.link}
                        activeClassName={styles.active}
                        exact
                        to="/about"
                        onClick={props.onClick}
                    >
                        About
                    </NavLink>
                </li>
                {(config.instagram && config.instagram.length > 0) && props.showInstagram &&
                    <li className={styles.item}>
                        <a
                            className={cx("link", "instagram")}
                            href={`https://instagram.com/${config.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={['fab', 'instagram']}
                                className={styles.icon}
                            />
                        </a>
                    </li>
                }
            </ul>
        </nav>
    );
}