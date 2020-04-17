import React from 'react';

// JSX Imports
import { NavLink } from 'react-router-dom';

// Resources
import styles from './Navigation.module.scss';

// Constants

export default function Links(props) {
    return(
        <nav className={styles.navigation}>
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
            </ul>
        </nav>
    );
}