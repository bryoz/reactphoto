import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../navigation/Navigation';
import Heading from '../heading/Heading';
import config from '../../data/config.json';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Header() {
    const site = Object.values(config)[0];
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header className={cx("wrapper", {isHome: isHome})}>
            <div className={styles.header}>
                <Heading
                    className={styles.title} 
                    tag="h1"
                >
                    {site.title}
                </Heading>
                {isHome &&
                    <p className={styles.description}>{site.subtitle}</p>
                }
            </div>

            <Navigation />
        </header>
    );
}
