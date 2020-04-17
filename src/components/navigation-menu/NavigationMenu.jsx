import React from 'react';

import styles from './NavigationMenu.module.scss';

export default class NavigationMenu extends React.PureComponent {
    componentDidMount() {
        console.log("open");
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        console.log("closed");
        document.body.style.overflow = 'initial';
    }

    render() {

        return (
            <div className={styles.wrapper}>
                {this.props.children}
            </div>
        );
    }
}