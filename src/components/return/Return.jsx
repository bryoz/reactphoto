import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import styles from './Return.module.scss';

export default function Return(props) {
    const location = useLocation();
    const currentPath = location.pathname;
    const parent = currentPath.substring(0, currentPath.lastIndexOf("/"));

    return (
        <nav className={styles.wrapper}>
            <Link
                to={parent}
                className={styles.link}
            >
                Back to index
            </Link>
        </nav>
    );
}