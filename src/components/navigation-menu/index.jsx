import React from 'react';
import Social from "../social"
import * as styles from "./NavigationMenu.module.scss";

export default class NavigationMenu extends React.PureComponent {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'initial';
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    {this.props.children}
                    <div className={styles.social}>
                        <Social config={this.props.config} />
                    </div>
                </div>
            </div>
        );
    }
}
