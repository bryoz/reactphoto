import React from 'react';
import classNames from 'classnames/bind'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Heading from '../heading/Heading'; 

import styles from './Social.module.scss';
import { config } from '../../data';
const cx = classNames.bind(styles); 

export default class Social extends React.PureComponent {
    render() {
        library.add(fab);

        const social = config.social;

        return (
            <div className={styles.wrapper}>
                <Heading tag="h3">{this.props.title}</Heading>
                <ul className={styles.list}>
                    {social.map((item) =>(
                        <li key={item.name} className={cx("item", item.name)}>
                            <a href={`/${item.url}`}>
                            {item.icon ?
                                <FontAwesomeIcon
                                    icon={['fab', item.icon]}
                                    className={styles.icon}
                                />
                            :
                                item.title
                            }
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}