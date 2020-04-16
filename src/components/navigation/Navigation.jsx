import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import Heading from '../heading/Heading';

import { photoPages, config } from '../../data';

import styles from './Navigation.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    closeMenu() {
        this.setState({
            menuOpen: false
        });
    }

    render() {
        const pages = Object.values(photoPages);

        return (
            <div className={styles.wrapper}>
                <MediaQuery maxWidth={900}>
                    <div
                        className={styles.menu}
                        onClick={this.toggleMenu}
                    >
                        {this.state.menuOpen ?
                            <span>Close</span>
                        :
                            <span>Menu</span>
                        }
                    </div>
                </MediaQuery>
                <div className={cx('content', (this.state.menuOpen ? 'open': 'closed'))}>
                    <Heading
                        className={styles.title} 
                        tag="h1"
                    >
                        {config.title}
                    </Heading>
                    <nav className={styles.navigation}>
                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <NavLink
                                    className={styles.link}
                                    activeClassName={styles.active}
                                    exact
                                    to="/"
                                    onClick={this.closeMenu}
                                >
                                    Latest
                                </NavLink>
                            </li>
                            {pages.map((page) =>(
                                <li className={styles.item} key={page.name}>
                                    <NavLink
                                        className={styles.link}
                                        activeClassName={styles.active}
                                        strict
                                        to={page.slug}
                                        onClick={this.closeMenu}
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
                                    onClick={this.closeMenu}
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
    
export default Navigation;