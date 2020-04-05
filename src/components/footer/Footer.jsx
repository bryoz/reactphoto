import React from 'react';

import config from '../../data/config.json';

import styles from './Footer.module.scss';

export default class Footer extends React.PureComponent {

    render() {
        const site = Object.values(config)[0];

        return (
            <footer className={styles.wrapper}>
                <p>
                    <a 
                        href={site.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        {site.title}
                    </a>
                    {' '}- by {site.author}
                </p>
            </footer>
        );
    }

}