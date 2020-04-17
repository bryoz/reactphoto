import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import NavigationMenu from '../navigation-menu/NavigationMenu';

import { photoPages } from '../../data';

import styles from './Navigation.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Links(props) {
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


export default function Navigation() {
    const [menuActive, setMenuState] = useState(false);
    const pages = Object.values(photoPages);

    return (
        <div className={styles.wrapper}>
            <MediaQuery maxWidth={767}>
                <div
                    className={styles.menu}
                    onClick={() => setMenuState(!menuActive)}
                >
                    {menuActive ?
                        <span>Close</span>
                    :
                        <span>Menu</span>
                    }
                </div>
                {menuActive &&
                    <NavigationMenu>
                        <Links
                            onClick={() => setMenuState(false)}
                            pages={pages}
                        />
                    </NavigationMenu>
                }
            </MediaQuery>
            <MediaQuery minWidth={768}>
                <Links
                    pages={pages}
                />
            </MediaQuery>
        </div>
    );
}