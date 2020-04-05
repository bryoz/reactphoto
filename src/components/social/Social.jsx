import React from 'react';
import classNames from 'classnames/bind'; 
import Heading from '../heading/Heading'; 

import styles from './Social.module.scss';
import data from '../../data/config.json';
const cx = classNames.bind(styles); 

export default class Social extends React.PureComponent {
    render() {

        const site = Object.values(data)[0];
        const social = site.social;

        return (
            <div className={styles.wrapper}>
                <Heading tag="h3">{this.props.title}</Heading>
                <ul className={styles.list}>
                    {social.map((item) =>(
                        <li key={item.name} className={cx("item", item.name)}>
                            <a href={`/${item.url}`}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}