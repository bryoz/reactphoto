import React from 'react';

import Social from '../social/Social';

import styles from './NavigationMenu.module.scss';

export default class NavigationMenu extends React.PureComponent {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount(props) {
        document.body.style.overflow = 'initial';
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.props.children}

                <div className={styles.social}>
                    <Social />
                </div>
            </div>
        );
    }
}