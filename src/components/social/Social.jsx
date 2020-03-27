import React from 'react';
import { map } from 'underscore';
import classNames from 'classnames/bind'; 
import Heading from '../heading/Heading'; 

import styles from './Social.module.scss';
const cx = classNames.bind(styles); 

export default class Social extends React.PureComponent {
    render() {

        // const social = Object.values(this.props.social);

        console.log(this.props)

        return (
            <div className={styles.wrapper}>
                <Heading tag="h3">{this.props.title}</Heading>
                <ul className={styles.list}>
                    {this.props.profiles.map((item) =>(
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