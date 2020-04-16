import React from 'react';

import { config } from '../../data';

import styles from './Footer.module.scss';

export default class Footer extends React.PureComponent {

    render() {
        return (
            <footer className={styles.wrapper}>
                <p>
                    <a 
                        href={config.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        {config.title}
                    </a>
                    {' '}- by {config.author}
                </p>
            </footer>
        );
    }

}