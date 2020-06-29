import React from 'react';

import { config } from '../../data';

import styles from './Footer.module.scss';

export default class Footer extends React.PureComponent {

    render() {
        return (
            <footer className={styles.wrapper}>
                <p>
                    {config.title}
                    {' '}by {config.author}.
                    Powered by
                    {' '}
                    <a
                        href="https://github.com/bryoz/reactphoto"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ReactPhoto
                    </a>.
                </p>
            </footer>
        );
    }

}