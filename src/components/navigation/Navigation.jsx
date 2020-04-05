import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MediaQuery, { useMediaQuery } from 'react-responsive';

import data from '../../data/data.json';
import styles from './Navigation.module.scss';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    
    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    
    render() {
        const pages = Object.values(data);
        // const fullNav = useMediaQuery({ 
        //     query: '(max-width: 900px)' 
        // });
        // && fullNav

        return (
            <nav className={styles.wrapper}>
                {/* <MediaQuery maxWidth={900}>
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
                </MediaQuery> */}
                <ul 
                    className={styles.list} 
                    style={{
                        // display: this.state.menuOpen  ? "block" : "none"
                    }}>
                    <li className={styles.item}>
                        <NavLink
                            className={styles.link}
                            activeClassName={styles.active}
                            exact
                            to="/"
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