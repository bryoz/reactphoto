import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import data from '../../data/data.json';
import styles from './Navigation.module.scss';

class Navigation extends Component {
    render() {

        const pages = Object.values(data);

        return (
            <nav className={styles.wrapper}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink
                            className={styles.link}
                            activeClassName={styles.active}
                            exact to="/"
                        >
                            Works
                        </NavLink>
                    </li>
                    {pages.map((page) =>(
                        <li className={styles.item} key={page.name}>
                            <NavLink
                                className={styles.link}
                                activeClassName={styles.active}
                                strict
                                to={page.slug}
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
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}
    
export default Navigation;