import React from 'react';

import styles from './Heading.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Heading extends React.PureComponent {

    render() {
        const Tag = this.props.tag ? this.props.tag : "h6"
        const classes = cx(
            this.props.extraClasses
        );

        return (
            <Tag className={classes}>
                {this.props.children}
            </Tag>
        );
    }
}