import React from 'react';
import Navigation from '../navigation/Navigation';
import Heading from '../heading/Heading';

import styles from './Header.module.scss'

export default class Header extends React.PureComponent {

    render() {
        //TODO: Give this a different class when it's the Home page
        return (
            <header className={styles.wrapper}>
                <Heading tag="h1">ReactPhoto</Heading>
                <Navigation />
            </header>
        );
    }
}