import React from 'react';
import Navigation from '../navigation/Navigation';
import Heading from '../heading/Heading';

import config from '../../data/config.json';
import styles from './Header.module.scss';

export default class Header extends React.PureComponent {

    render() {
        const site = Object.values(config)[0];

        //TODO: Give this a different class when it's the Home page
        return (
            <header className={styles.wrapper}>
                <Heading tag="h1">{site.title}</Heading>
                <Navigation />
            </header>
        );
    }
}